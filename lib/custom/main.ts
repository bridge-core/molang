import { ExecutionEnvironment } from '../env/env'
import { IParserConfig } from '../main'
import { MolangParser } from '../parser/molang'
import { Tokenizer } from '../tokenizer/Tokenizer'
import { CustomFunctionParselet } from './function'
import { Molang } from '../Molang'
import { StatementExpression } from '../parser/expressions/statement'
import { transformStatement } from './transformStatement'
import { NameExpression } from '../parser/expressions/name'
import { ReturnExpression } from '../parser/expressions/return'
import { GenericOperatorExpression } from '../parser/expressions/genericOperator'
import { TernaryExpression } from '../parser/expressions/ternary'
import { IExpression } from '../parser/expression'
import { VoidExpression } from '../parser/expressions/void'
import { GroupExpression } from '../parser/expressions/group'
import { CustomClassParselet } from './class'

export class CustomMolangParser extends MolangParser {
	public readonly functions = new Map<string, [string[], string]>()
	public readonly classes = new Map<string, any>() // TODO: Make class data more specific than "any"

	constructor(config: Partial<IParserConfig>) {
		super(config)
		this.registerPrefix('FUNCTION', new CustomFunctionParselet())
		// this.registerPrefix('CLASS', new CustomClassParselet())
	}

	reset() {
		this.functions.clear()
	}
}

export class CustomMolang {
	protected parser: CustomMolangParser

	constructor(env: any) {
		this.parser = new CustomMolangParser({
			useCache: false,
			useOptimizer: true,
			useAgressiveStaticOptimizer: true,
			keepGroups: true,
			earlyReturnsSkipParsing: false,
			earlyReturnsSkipTokenization: false,
		})
		this.parser.setExecutionEnvironment(
			new ExecutionEnvironment(this.parser, env)
		)
		this.parser.setTokenizer(
			new Tokenizer(new Set(['function' /*'class'*/]))
		)
	}

	get functions() {
		return this.parser.functions
	}

	parse(expression: string) {
		this.parser.init(expression.replace(/\"/g, "'"))
		const abstractSyntaxTree = this.parser.parseExpression()

		return abstractSyntaxTree
	}

	transform(source: string) {
		const molang = new Molang(
			{},
			{
				useCache: false,
				keepGroups: true,
				useOptimizer: true,
				useAgressiveStaticOptimizer: true,
				earlyReturnsSkipParsing: true,
				earlyReturnsSkipTokenization: false,
			}
		)

		let totalScoped = 0
		let ast = molang.parse(source)

		let isComplexExpression = false
		if (ast instanceof StatementExpression) {
			isComplexExpression = true
		}

		let containsComplexExpressions = false
		ast = ast.walk((expr: any) => {
			// Only run code on function expressions which start with "f." or "function."
			if (
				expr.type !== 'FunctionExpression' ||
				(!expr.name.name.startsWith?.('f.') &&
					!expr.name.name.startsWith?.('function.'))
			)
				return

			const nameExpr = expr.name
			const functionName = nameExpr.name.replace(/(f|function)\./g, '')
			const argValues = expr.args

			let [args, functionBody] = this.functions.get(functionName) ?? []
			if (!functionBody || !args) return

			// Insert argument values
			functionBody = functionBody.replace(
				/(a|arg)\.(\w+)/g,
				(match, prefix, argName) => {
					const val =
						argValues[args!.indexOf(argName)]?.toString() ?? '0'

					return val.replace(/(t|temp)\./, 'outer_temp.')
				}
			)

			let funcAst = transformStatement(molang.parse(functionBody))

			if (funcAst instanceof StatementExpression) {
				const hasTopLevelReturn = funcAst.allExpressions.some(
					(expr) => expr instanceof ReturnExpression
				)
				const hasReturn =
					hasTopLevelReturn ||
					funcAst.some((expr) => expr instanceof ReturnExpression)

				funcAst = molang.parse(
					`({${functionBody}}+${
						hasReturn
							? hasTopLevelReturn
								? 't.return_value'
								: '(t.return_value??0)' // If there's no top-level return, we need to ensure that the variable access doesn't fail
							: '0' // Return 0 if no return statement
					})`
				)

				containsComplexExpressions = true
			}

			const varNameMap = new Map<string, string>()
			funcAst = funcAst.walk((expr) => {
				if (expr instanceof NameExpression) {
					const fullName = expr.toString()
					// Remove "a."/"t."/etc. from var name
					let tmp = fullName.split('.')
					const varType = tmp.shift()
					const [structName, ...structProperties] = tmp
					const structAccess =
						structProperties.length > 0
							? '.' + structProperties.join('.')
							: ''

					if (varType === 't' || varType === 'temp') {
						// Scope temp./t. variables to functions
						let newName = varNameMap.get(structName)
						if (!newName) {
							newName = `t.__scvar${totalScoped++}`
							varNameMap.set(structName, newName)
						}

						expr.setName(`${newName}${structAccess}`)
					} else if (varType === 'outer_temp') {
						expr.setName(`t.${structName}${structAccess}`)
					}

					return undefined
				} else if (expr instanceof ReturnExpression) {
					const nameExpr = new NameExpression(
						molang.getParser().executionEnv,
						't.return_value'
					)
					const returnValExpr = expr.allExpressions[0]

					return new GenericOperatorExpression(
						nameExpr,
						returnValExpr,
						'=',
						() => {
							nameExpr.setPointer(returnValExpr.eval())
						}
					)
				} else if (expr instanceof StatementExpression) {
					// Make early returns work correctly by adjusting ternary statements which contain return statements
					const expressions: IExpression[] = []

					for (let i = 0; i < expr.allExpressions.length; i++) {
						const currExpr = expr.allExpressions[i]

						if (
							currExpr instanceof TernaryExpression &&
							currExpr.hasReturn
						) {
							handleTernary(
								currExpr,
								expr.allExpressions.slice(i + 1)
							)

							expressions.push(currExpr)
							break
						} else if (currExpr.isReturn) {
							expressions.push(currExpr)
							break
						}

						expressions.push(currExpr)
					}

					return new StatementExpression(expressions)
				}
			})

			return funcAst
		})

		const finalAst = molang.parse(ast.toString())
		molang.resolveStatic(finalAst)
		return !isComplexExpression && containsComplexExpressions
			? `return ${finalAst.toString()};`
			: finalAst.toString()
	}

	reset() {
		this.functions.clear()
	}
}

function handleTernary(
	returnTernary: TernaryExpression,
	currentExpressions: IExpression[]
) {
	// If & else branch end with return statements -> we can omit everything after the ternary
	if (returnTernary.isReturn) return

	const notReturningBranchIndex = returnTernary.allExpressions[2].isReturn
		? 1
		: 2
	const notReturningBranch =
		returnTernary.allExpressions[notReturningBranchIndex]

	if (!(notReturningBranch instanceof VoidExpression)) {
		if (
			notReturningBranch instanceof GroupExpression &&
			notReturningBranch.allExpressions[0] instanceof StatementExpression
		) {
			currentExpressions.unshift(...notReturningBranch.allExpressions)
		} else {
			currentExpressions.unshift(notReturningBranch)
		}
	}
	if (currentExpressions.length > 0)
		returnTernary.setExpressionAt(
			notReturningBranchIndex,
			new GroupExpression(
				new StatementExpression(currentExpressions),
				'{}'
			)
		)
}

import { ExecutionEnvironment } from '../env'
import { IExpression, IParserConfig } from '../main'
import { StaticExpression } from '../parser/expressions/static'
import { MoLangParser } from '../parser/molang'
import { Tokenizer } from '../tokenizer/main'
import { CustomFunctionParselet } from './function'
import { MoLang } from '../MoLang'
import { StatementExpression } from '../parser/expressions/statement'
import { GroupExpression } from '../parser/expressions/group'
import { transformStatement } from './transformStatement'

export class CustomMoLangParser extends MoLangParser {
	public readonly functions = new Map<string, [string[], string]>()

	constructor(config: Partial<IParserConfig>) {
		super(config)

		this.registerPrefix('FUNCTION', new CustomFunctionParselet())
	}

	reset() {
		this.functions.clear()
	}
}

export class CustomMoLang {
	protected parser: CustomMoLangParser

	constructor(env: any) {
		this.parser = new CustomMoLangParser({
			useCache: false,
			useOptimizer: true,
			useAgressiveStaticOptimizer: true,
			keepGroups: true,
		})
		this.parser.setExecutionEnvironment(new ExecutionEnvironment(env))
		this.parser.setTokenizer(new Tokenizer(new Set(['function'])))
	}

	get functions() {
		return this.parser.functions
	}

	parse(expression: string) {
		this.parser.init(expression)
		const abstractSyntaxTree = this.parser.parseExpression()

		return abstractSyntaxTree
	}

	transform(source: string) {
		const molang = new MoLang(
			{},
			{
				useCache: false,
				keepGroups: true,
				useOptimizer: true,
				useAgressiveStaticOptimizer: true,
			}
		)

		let functionCount = 0
		let totalScoped = 0
		let ast = molang.parse(source)
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
			const returnVarName = `t.bridge_func_${functionCount++}`
			const argValues = expr.args

			let [args, functionBody] = this.functions.get(functionName) ?? []
			if (!functionBody || !args) return

			// Scope temp./t. variables to functions
			const varNameMap = new Map<string, string>()
			functionBody = functionBody.replace(
				/(t|temp)\.(\w+)/g,
				(match, prefix, argName) => {
					let newName = varNameMap.get(argName)
					if (newName) return newName

					newName = `t.scvar${totalScoped++}`
					varNameMap.set(argName, newName)
					return newName
				}
			)

			// Insert argument values
			functionBody = functionBody.replace(
				/(a|arg)\.(\w+)/g,
				(match, prefix, argName) => {
					return argValues[args!.indexOf(argName)]?.toString() ?? '0'
				}
			)

			let funcAst = transformStatement(molang.parse(functionBody))
			if (funcAst instanceof StatementExpression) {
				funcAst = molang.parse(`({${functionBody}}+${returnVarName})`)
			}

			// Replace arguments & "return" statement
			const transformedAst = funcAst.walk((expr: any) => {
				if (expr.type === 'ReturnExpression') {
					expr.toString = function () {
						return `${returnVarName}=${this.expression.toString()}`
					}
					return
				} else if (
					expr.type !== 'NameExpression' ||
					(!expr.name.startsWith('arg.') &&
						!expr.name.startsWith('a.'))
				)
					return

				const argName = expr.name.replace(/(a|arg)\./g, '')

				return argValues[args!.indexOf(argName)] ?? '0' //The value the user passed for the current argument
			})

			return transformedAst
		})

		const finalAst = molang.parse(ast.toString())
		molang.resolveStatic(finalAst)
		return finalAst.toString()
	}

	reset() {
		this.functions.clear()
	}
}

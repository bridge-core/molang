import { ExecutionEnvironment } from '../env'
import { IParserConfig } from '../main'
import { StaticExpression } from '../parser/expressions/static'
import { MoLangParser } from '../parser/molang'
import { Tokenizer } from '../tokenizer/main'
import { CustomFunctionParselet } from './function'
import { MoLang } from '../MoLang'

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
				keepGroups: true,
				useOptimizer: true,
				useAgressiveStaticOptimizer: true,
			}
		)
		const includesReturn = source.match(/return\s+/g) !== null

		let functionCount = 0
		let ast = molang.parse(source)
		ast = ast.iterate((expr: any) => {
			if (
				expr.type !== 'FunctionExpression' ||
				(!expr.name.name.startsWith?.('f.') &&
					!expr.name.name.startsWith?.('function.'))
			)
				return

			const nameExpr = expr.name
			const functionName = nameExpr.name.replace(/(f|function)\./g, '')
			const returnVarName = `t.bridge_func_${functionCount++}`

			let [args, functionBody] = this.functions.get(functionName) ?? []
			if (!functionBody || !args) return

			const funcAst = molang.parse(`({${functionBody}}+${returnVarName})`)
			const argValues = expr.args

			// Replace arguments & "return" statement
			return funcAst.iterate((expr: any) => {
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

				return (
					argValues[args!.indexOf(argName)] ?? new StaticExpression(0)
				)
			})
		})

		return molang
			.parse(
				`${!includesReturn ? 'return ' : ''}${ast.toString()}${
					!includesReturn ? ';' : ''
				}`
			)
			.toString()
	}

	reset() {
		this.functions.clear()
	}
}

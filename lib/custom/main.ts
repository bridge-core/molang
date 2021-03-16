import { ExecutionEnvironment } from '../env'
import MoLang, { IParserConfig } from '../main'
import { MoLangParser } from '../parser/molang'
import { Tokenizer } from '../tokenizer/main'
import { CustomFunctionParselet } from './function'

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
		let frontInsert = ''
		const molang = new MoLang(
			{},
			{
				keepGroups: true,
				useOptimizer: true,
				useAgressiveStaticOptimizer: true,
			}
		)
		const includesReturn = source.match(/return\s+/g) !== null
		console.log(molang.parse(source))

		for (const [functionName, [args, functionBody]] of this.functions) {
			const baseVarName = `t.b_func_res_${functionName}`

			const nameMatcher = new RegExp(
				`(f|function)\\.${functionName}\\(\\s*${[
					...new Array(args.length),
				]
					.map(
						(_, i) => `(.+?)${i + 1 !== args.length ? '\\s*' : ''}`
					)
					.join(',')}\\s*\\)`,
				'g'
			)

			let functionCallAmount = 0
			source = source.replace(nameMatcher, (match, ...groups) => {
				const argValues = groups.slice(1, -2)
				const varName = `${baseVarName}_${functionCallAmount++}`
				console.log(match)

				const functionCode = molang
					.parse(
						functionBody.replace(
							/arg\.(\w+)/g,
							(match, ...groups) => {
								return argValues[args.indexOf(groups[0])] ?? 0
							}
						)
					)
					.toString()
					.replace(/return /g, `${varName}=`)

				return `({${functionCode}}+${varName})`
			})
		}

		return `${frontInsert}${!includesReturn ? 'return ' : ''}${source}${
			!includesReturn ? ';' : ''
		}`
	}

	reset() {
		this.functions.clear()
	}
}

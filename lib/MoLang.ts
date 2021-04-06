import { ExecutionEnvironment } from './env'
import { IExpression, IParserConfig } from './main'
import { StaticExpression } from './parser/expressions/static'
import { StringExpression } from './parser/expressions/string'
import { MoLangParser } from './parser/molang'

export class MoLang {
	protected expressionCache: Record<string, IExpression> = {}
	protected totalCacheEntries = 0
	protected executionEnvironment: ExecutionEnvironment

	protected parser: MoLangParser

	constructor(
		env: Record<string, unknown> = {},
		protected config: Partial<IParserConfig> = {}
	) {
		if (config.useOptimizer === undefined) this.config.useOptimizer = true
		if (config.useCache === undefined) this.config.useCache = true
		if (config.earlyReturnsSkipParsing === undefined)
			this.config.earlyReturnsSkipParsing = true
		if (config.earlyReturnsSkipTokenization === undefined)
			this.config.earlyReturnsSkipTokenization = true

		this.parser = new MoLangParser({
			...this.config,
			tokenizer: undefined,
		})

		this.executionEnvironment = new ExecutionEnvironment(
			env,
			config.variableHandler
		)
	}

	updateConfig(newConfig: Partial<IParserConfig>) {
		newConfig = Object.assign(this.config, newConfig)

		if (newConfig.tokenizer) this.parser.setTokenizer(newConfig.tokenizer)
		this.parser.updateConfig({ ...this.config, tokenizer: undefined })
	}
	updateExecutionEnv(env: Record<string, unknown>) {
		this.executionEnvironment = new ExecutionEnvironment(
			env,
			this.config.variableHandler
		)
		this.parser.setExecutionEnvironment(this.executionEnvironment)
	}
	/**
	 * Clears the MoLang expression cache
	 */
	clearCache() {
		this.expressionCache = {}
		this.totalCacheEntries = 0
	}

	/**
	 * Execute the given MoLang string `expression`
	 * @param expression The MoLang string to execute
	 *
	 * @returns The value the MoLang expression corresponds to
	 */
	execute(expression: string) {
		this.parser.setExecutionEnvironment(this.executionEnvironment)
		const abstractSyntaxTree = this.parse(expression)

		const result = abstractSyntaxTree.eval()
		if (result === undefined) return 0
		if (typeof result === 'boolean') return Number(result)
		return result
	}
	/**
	 * Execute the given MoLang string `expression`
	 * In case of errors, return 0
	 * @param expression The MoLang string to execute
	 *
	 * @returns The value the MoLang expression corresponds to and 0 if the statement is invalid
	 */
	executeAndCatch(expression: string) {
		try {
			return this.execute(expression)
		} catch {
			return 0
		}
	}

	/**
	 * Parse the given MoLang string `expression`
	 * @param expression The MoLang string to parse
	 *
	 * @returns An AST that corresponds to the MoLang expression
	 */
	parse(expression: string): IExpression {
		if (this.config.useCache ?? true) {
			const abstractSyntaxTree = this.expressionCache[expression]
			if (abstractSyntaxTree) return abstractSyntaxTree
		}

		this.parser.init(expression)
		let abstractSyntaxTree = this.parser.parseExpression()
		if ((this.config.useOptimizer ?? true) && abstractSyntaxTree.isStatic())
			abstractSyntaxTree = new StaticExpression(abstractSyntaxTree.eval())
		// console.log(JSON.stringify(abstractSyntaxTree, null, '  '))

		if (this.config.useCache ?? true) {
			if (this.totalCacheEntries > (this.config.maxCacheSize || 256))
				this.clearCache()

			this.expressionCache[expression] = abstractSyntaxTree
			this.totalCacheEntries++
		}

		return abstractSyntaxTree
	}

	resolveStatic(ast: IExpression) {
		ast.walk((expr) => {
			if (expr instanceof StringExpression) return

			if (expr.isStatic()) return new StaticExpression(expr.eval())
		})
	}

	getParser() {
		return this.parser
	}
}

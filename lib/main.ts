import { IExpression } from './parser/expression'
import { MoLangParser } from './parser/molang'
import { tokenize } from './tokenizer/tokenize'
import { StaticExpression } from './parser/expressions/static'
import { ExecutionEnvironment } from './env'

/**
 * How the parser and interpreter should handle your MoLang expression
 */

export interface IParserConfig {
	/**
	 * Whether a cache should be used to speed up executing MoLang.
	 * The cache saves an AST for every parsed expression.
	 * This allows us to skip the tokenization & parsing step before executing known MoLang expressions
	 *
	 * Default: `true`
	 */
	useCache: boolean
	/**
	 * How many expressions can be cached. After reaching `maxCacheSize`, the whole cache is cleared automatically.
	 * Can be set to `Infinity` to remove the limit completely
	 *
	 * Default: `256`
	 */
	maxCacheSize: number
	/**
	 * The optimizer can drastically speed up parsing & executing MoLang.
	 * It enables skipping of unreachable statements, pre-evaluating static expressions and skipping of statements with no effect
	 * when used together with the `useAgressiveStaticOptimizer` option
	 *
	 * Default: `true`
	 */
	useOptimizer: boolean
	/**
	 * Skip execution of statements with no effect
	 * when used together with the `useOptimizer` option
	 *
	 * Default: `true`
	 */
	useAgressiveStaticOptimizer: boolean

	/**
	 * Partially resolve variables upon parsing if they're defined inside of the provided environment
	 */
	partialResolveOnParse: boolean

	/**
	 * Tokenizer to use for tokenizing the expression
	 */
	tokenizer: ReturnType<typeof tokenize>
}

export class MoLang {
	protected expressionCache: Record<string, IExpression> = {}
	protected totalCacheEntries = 0
	protected executionEnvironment: ExecutionEnvironment

	protected parser = new MoLangParser(
		this.config.useOptimizer,
		this.config.useAgressiveStaticOptimizer
	)

	constructor(
		env: Record<string, unknown> = {},
		protected config: Partial<IParserConfig> = {}
	) {
		this.executionEnvironment = new ExecutionEnvironment(env)
	}

	updateConfig(newConfig: Partial<IParserConfig>) {
		this.config = Object.assign(this.config, newConfig)
		this.parser.updateConfig(
			newConfig.useOptimizer,
			newConfig.useAgressiveStaticOptimizer,
			newConfig.partialResolveOnParse
		)
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
	forgivingExecute(expression: string) {
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

		this.parser.setTokenizer(this.config.tokenizer || tokenize(expression))
		const abstractSyntaxTree = this.parser.parseExpression()
		// console.log(JSON.stringify(abstractSyntaxTree, null, '  '))

		if (this.config.useCache ?? true) {
			if (this.totalCacheEntries > (this.config.maxCacheSize ?? 256))
				this.clearCache()

			this.expressionCache[expression] =
				(this.config.useOptimizer ?? true) &&
				abstractSyntaxTree.isStatic()
					? new StaticExpression(abstractSyntaxTree.eval())
					: abstractSyntaxTree
			this.totalCacheEntries++
		}

		return abstractSyntaxTree
	}
}

export { tokenize } from './tokenizer/tokenize'
export { IExpression } from './parser/expression'

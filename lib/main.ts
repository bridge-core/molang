import { IExpression } from './parser/expression'
import { MoLangParser } from './parser/molang'
import { tokenize } from './tokenizer/tokenize'
import { StaticExpression } from './parser/expressions/static'
import { setEnv } from './env'

/**
 *  Cache functionality
 */

let expressionCache: Record<string, IExpression> = {}
let totalCacheEntries = 0
/**
 * Clears the MoLang expression cache
 */
export function clearCache() {
	expressionCache = {}
}

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

/**
 * Execute the given MoLang string `expression`
 * @param expression The MoLang string to execute
 * @param env (Optional) The environment to execute the MoLang expression with
 * @param config (Optional) Configure how the expression gets executed
 *
 * @returns The value the MoLang expression corresponds to
 */
export function execute(
	expression: string,
	env?: Record<string, unknown> | undefined,
	config: Partial<IParserConfig> = {}
) {
	if (env) setEnv(env)

	const abstractSyntaxTree = parse(expression, config)
	// console.log(JSON.stringify(abstractSyntaxTree, null, '  '))
	const result = abstractSyntaxTree.eval()
	if (result === undefined) return 0
	if (typeof result === 'boolean') return Number(result)
	return result
}

/**
 * Parse the given MoLang string `expression`
 * @param expression The MoLang string to parse
 * @param config (Optional) Configure how the expression gets parsed
 *
 * @returns An AST that corresponds to the MoLang expression
 */
export function parse(
	expression: string,
	{
		useCache = true,
		useOptimizer = true,
		useAgressiveStaticOptimizer = true,
		maxCacheSize = 256,
		tokenizer = tokenize(expression),
	}: Partial<IParserConfig> = {}
): IExpression {
	if (useCache) {
		const abstractSyntaxTree = expressionCache[expression]
		if (abstractSyntaxTree) return abstractSyntaxTree
	}

	const parser = new MoLangParser(
		tokenizer,
		useOptimizer,
		useAgressiveStaticOptimizer
	)
	const abstractSyntaxTree = parser.parseExpression()
	// console.log(JSON.stringify(abstractSyntaxTree, null, '  '))

	if (useCache) {
		if (totalCacheEntries > maxCacheSize) clearCache()

		expressionCache[expression] =
			useOptimizer && abstractSyntaxTree.isStatic()
				? new StaticExpression(abstractSyntaxTree.eval())
				: abstractSyntaxTree
		totalCacheEntries++
	}

	return abstractSyntaxTree
}

export { tokenize } from './tokenizer/tokenize'
export { setEnv } from './env'
export { IExpression } from './parser/expression'

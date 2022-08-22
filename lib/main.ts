import { TVariableHandler } from './env/env'
import { Tokenizer } from './tokenizer/Tokenizer'

/**
 * How the parser and interpreter should handle your Molang expression
 */

export interface IParserConfig {
	/**
	 * Whether a cache should be used to speed up executing Molang.
	 * The cache saves an AST for every parsed expression.
	 * This allows us to skip the tokenization & parsing step before executing known Molang expressions
	 *
	 * @default true
	 */
	useCache: boolean
	/**
	 * How many expressions can be cached. After reaching `maxCacheSize`, the whole cache is cleared automatically.
	 * Can be set to `Infinity` to remove the limit completely
	 *
	 * @default 256
	 */
	maxCacheSize: number
	/**
	 * The optimizer can drastically speed up parsing & executing Molang.
	 * It enables skipping of unreachable statements, pre-evaluating static expressions and skipping of statements with no effect
	 * when used together with the `useAgressiveStaticOptimizer` option
	 *
	 * @default true
	 */
	useOptimizer: boolean
	/**
	 * Skip execution of statements with no effect
	 * when used together with the `useOptimizer` option
	 *
	 * @default true
	 */
	useAgressiveStaticOptimizer: boolean

	/**
	 * This options makes early return statements skip all parsing work completely
	 *
	 * @default true
	 */
	earlyReturnsSkipParsing: boolean
	/**
	 * This options makes early return statements skip all tokenization work completely if earlyReturnsSkipParsing is set to true
	 *
	 * @default true
	 */
	earlyReturnsSkipTokenization: boolean
	/**
	 * Tokenizer to use for tokenizing the expression
	 */
	tokenizer: Tokenizer
	/**
	 * Create expression instances for brackets ("()", "{}")
	 *
	 * This should only be set to true if you want to use the .toString() method of an expression
	 * or you want to iterate over the whole AST
	 *
	 * @default false
	 */
	keepGroups: boolean

	/**
	 * Whether to convert undefined variables to "0"
	 *
	 * @default false
	 */
	convertUndefined: boolean

	/**
	 * Use radians instead of degrees for trigonometric functions
	 *
	 * @default false
	 */
	useRadians: boolean

	/**
	 * Resolve undefined variables
	 */
	variableHandler: TVariableHandler

	/**
	 * Don not try to flatten the passed environement
	 *
	 * @example { query: { test: 1 } } -> { 'query.test': 1 }
	 *
	 * @default false
	 */
	assumeFlatEnvironment: boolean
}

export { Tokenizer } from './tokenizer/Tokenizer'
export { IExpression } from './parser/expression'
export { CustomMolang } from './custom/main'
export { Molang } from './Molang'
export * as expressions from './parser/expressions/index'
export { Context } from './env/env'

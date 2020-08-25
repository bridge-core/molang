import { IExpression } from './parser/expression'
import { MoLangParser } from './parser/molang'
import { tokenize } from './tokenizer/tokenize'
import { StaticExpression } from './parser/expressions/static'
import { setEnv } from './env'

// Cache
let expressionCache: Record<string, IExpression> = {}
let totalCacheEntries = 0
export function clearCache() {
	expressionCache = {}
}

// Parser config
export interface IParserConfig {
	useCache: boolean
	useOptimizer: boolean
	useAgressiveStaticOptimizer: boolean
	maxCacheSize: number
}

export function execute(
	expression: string,
	env?: Record<string, unknown> | undefined,
	config: Partial<IParserConfig> = {}
) {
	const abstractSyntaxTree = parse(expression, env, config)
	// console.log(JSON.stringify(abstractSyntaxTree, null, '  '))
	const result = abstractSyntaxTree.eval()
	if (result === undefined) return 0
	if (typeof result === 'boolean') return Number(result)
	return result
}

export function parse(
	expression: string,
	env?: Record<string, unknown> | undefined,
	{
		useCache = true,
		useOptimizer = true,
		useAgressiveStaticOptimizer = true,
		maxCacheSize = 256,
	}: Partial<IParserConfig> = {}
): IExpression {
	if (env) setEnv(env)
	if (useCache) {
		const abstractSyntaxTree = expressionCache[expression]
		if (abstractSyntaxTree) return abstractSyntaxTree
	}

	const parser = new MoLangParser(
		tokenize(expression),
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

export { setEnv } from './env'
export { IExpression } from './parser/expression'

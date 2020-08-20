import { IExpression } from './parser/expression'
import { MoLangParser } from './parser/molang'
import { tokenize } from './tokenizer/tokenize'
import { StaticExpression } from './parser/expressions/static'

let expressionCache: Record<string, IExpression> = {}
export function clearCache() {
	expressionCache = {}
}
export function execute(
	expression: string,
	useCache = true,
	useOptimizer = true
) {
	const abstractSyntaxTree = parse(expression, useCache, useOptimizer)
	// console.log(JSON.stringify(abstractSyntaxTree, null, '  '))
	const result = abstractSyntaxTree.eval()
	if (result === undefined) return 0
	if (typeof result === 'boolean') return Number(result)
	return result
}

export function parse(
	expression: string,
	useCache = true,
	useOptimizer = true
): IExpression {
	if (useCache) {
		const abstractSyntaxTree = expressionCache[expression]
		if (abstractSyntaxTree) return abstractSyntaxTree
	}

	const parser = new MoLangParser(tokenize(expression), useOptimizer)
	const abstractSyntaxTree = parser.parseExpression()
	// console.log(JSON.stringify(abstractSyntaxTree, null, '  '))

	if (useCache)
		expressionCache[expression] =
			useOptimizer && abstractSyntaxTree.isStatic()
				? new StaticExpression(abstractSyntaxTree.eval())
				: abstractSyntaxTree
	return abstractSyntaxTree
}

export { setEnv } from './env'

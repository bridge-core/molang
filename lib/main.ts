import { IExpression } from './parser/expression'
import { MoLangParser } from './parser/molang'
import { tokenize } from './tokenizer/tokenize'

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
	// console.log(abstractSyntaxTree)
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
	// console.log(abstractSyntaxTree)

	if (useCache) expressionCache[expression] = abstractSyntaxTree
	return abstractSyntaxTree
}

export { setEnv } from './env'

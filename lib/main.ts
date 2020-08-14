import { IExpression } from './parser/expression'
import { MoLangParser } from './parser/molang'
import { tokenize } from './tokenizer/tokenize'

export const expressionCache = new Map<string, IExpression>()
export function execute(
	expression: string,
	useCache = true,
	useOptimizer = true
) {
	if (useCache) {
		const expressionObj = expressionCache.get(expression)
		if (expressionObj) return expressionObj.eval()
	}

	const parser = new MoLangParser(tokenize(expression), useOptimizer)
	const expressionObj = parser.parseExpression()
	// console.log(expressionObj)

	if (useCache) expressionCache.set(expression, expressionObj)
	const result = expressionObj.eval()
	if (typeof result === 'boolean') return Number(result)
	return result
}

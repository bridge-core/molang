import { IExpression } from './parser/expression'
import { MoLangParser } from './parser/molang'
import { tokenize } from './tokenizer/tokenize'

export const expressionCache = new Map<string, IExpression>()
export function evalMoLang(expression: string, useCache = true) {
	if (useCache) {
		const expressionObj = expressionCache.get(expression)
		if (expressionObj) return expressionObj.eval()
	}

	const parser = new MoLangParser(tokenize(expression))
	const result = parser.parseExpression()

	if (useCache) expressionCache.set(expression, result)
	return result.eval()
}

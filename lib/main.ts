import { IExpression } from './parser/expression'
import { MoLangParser } from './parser/molang'
import { tokenize } from './tokenizer/tokenize'

let expressionCache: any = {}
export function clearCache() {
	expressionCache = {}
}
export function execute(
	expression: string,
	useCache = true,
	useOptimizer = true
) {
	if (useCache) {
		const expressionObj = expressionCache[expression]
		if (expressionObj) return expressionObj.eval()
	}

	const parser = new MoLangParser(tokenize(expression), useOptimizer)
	const expressionObj = parser.parseExpression()
	// console.log(expressionObj)

	if (useCache) expressionCache[expression] = expressionObj
	const result = expressionObj.eval()
	if (typeof result === 'boolean') return Number(result)
	return result
}
export { setEnv } from './env'

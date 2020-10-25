import { MoLangParser } from '../parser/molang'
import { IIterator, tokenize } from '../tokenizer/tokenize'
import { CustomFunctionParselet } from './function'

export class CustomMoLangParser extends MoLangParser {
	constructor(
		tokenIterator: IIterator,
		useOptimizer = true,
		agressiveStaticOptimizer = true
	) {
		super(tokenIterator, useOptimizer, agressiveStaticOptimizer)

		this.registerPrefix('FUNCTION', new CustomFunctionParselet())
	}
}

export function parseCustomSyntax(expression: string) {
	const parser = new CustomMoLangParser(
		tokenize(expression, new Set(['function']))
	)
	return parser.parseExpression().eval()
}

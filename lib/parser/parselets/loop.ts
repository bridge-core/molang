import { Parser } from '../parse'
import { Token } from '../../tokenizer/token'
import { IPrefixParselet } from './prefix'
import { IExpression } from '../expression'
import { LoopExpression } from '../expressions/loop'

export class LoopParselet implements IPrefixParselet {
	constructor(public precedence = 0) {}

	parse(parser: Parser, token: Token) {
		parser.consume('LEFT_PARENT')
		const args: IExpression[] = []

		if (parser.match('RIGHT_PARENT'))
			throw new Error(`loop() called without arguments`)

		do {
			args.push(parser.parseExpression())
		} while (parser.match('COMMA'))
		parser.consume('RIGHT_PARENT')

		if (args.length !== 2)
			throw new Error(
				`There must be exactly two loop() arguments; found ${args.length}`
			)

		return new LoopExpression(args[0], args[1])
	}
}

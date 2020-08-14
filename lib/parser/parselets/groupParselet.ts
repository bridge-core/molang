import { IPrefixParselet } from './prefix'
import { TToken } from '../../tokenizer/token'
import { Parser } from '../parse'

export class GroupParselet implements IPrefixParselet {
	constructor(public precedence = 0) {}

	parse(parser: Parser, token: TToken) {
		const expression = parser.parseExpression(this.precedence)
		parser.consume('RIGHT_PARENT')
		return expression
	}
}

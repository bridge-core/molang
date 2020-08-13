import { Parser } from '../parse'
import { IExpression } from '../expression'
import { TToken } from '../../tokenizer/token'
import { PrefixExpression } from '../expressions/prefix'

export interface IPrefixParselet {
	readonly precedence: number
	parse: (parser: Parser, token: TToken) => IExpression
}

export class PrefixOperator implements IPrefixParselet {
	constructor(public precedence = 0) {}

	parse(parser: Parser, token: TToken) {
		return new PrefixExpression(
			token[0],
			parser.parseExpression(this.precedence)
		)
	}
}

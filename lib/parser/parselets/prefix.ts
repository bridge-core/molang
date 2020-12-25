import { Parser } from '../parse'
import { IExpression } from '../expression'
import { Token } from '../../tokenizer/token'
import { PrefixExpression } from '../expressions/prefix'

export interface IPrefixParselet {
	readonly precedence: number
	parse: (parser: Parser, token: Token) => IExpression
}

export class PrefixOperator implements IPrefixParselet {
	constructor(public precedence = 0) {}

	parse(parser: Parser, token: Token) {
		return new PrefixExpression(
			token.getType(),
			parser.parseExpression(this.precedence)
		)
	}
}

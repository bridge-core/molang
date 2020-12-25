import { IPrefixParselet } from './prefix'
import { Token } from '../../tokenizer/token'
import { Parser } from '../parse'
import { BooleanExpression } from '../expressions/boolean'

export class BooleanParselet implements IPrefixParselet {
	constructor(public precedence = 0) {}

	parse(parser: Parser, token: Token) {
		return new BooleanExpression(token.getText() === 'true')
	}
}

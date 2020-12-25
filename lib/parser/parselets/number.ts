import { IPrefixParselet } from './prefix'
import { Token } from '../../tokenizer/token'
import { Parser } from '../parse'
import { NumberExpression } from '../expressions/number'

export class NumberParselet implements IPrefixParselet {
	constructor(public precedence = 0) {}

	parse(parser: Parser, token: Token) {
		return new NumberExpression(Number(token.getText()))
	}
}

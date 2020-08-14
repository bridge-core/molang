import { IPrefixParselet } from './prefix'
import { TToken } from '../../tokenizer/token'
import { Parser } from '../parse'
import { NumberExpression } from '../expressions/number'

export class NumberParselet implements IPrefixParselet {
	constructor(public precedence = 0) {}

	parse(parser: Parser, token: TToken) {
		return new NumberExpression(Number(token[1]))
	}
}

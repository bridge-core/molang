import { IPrefixParselet } from './prefix'
import { TToken } from '../../tokenizer/token'
import { Parser } from '../parse'
import { StringExpression } from '../expressions/string'

export class StringParselet implements IPrefixParselet {
	constructor(public precedence = 0) {}

	parse(parser: Parser, token: TToken) {
		return new StringExpression(token[1])
	}
}

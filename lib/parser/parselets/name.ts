import { IPrefixParselet } from './prefix'
import { TToken } from '../../tokenizer/token'
import { Parser } from '../parse'
import { NameExpression } from '../expressions/name'

export class NameParselet implements IPrefixParselet {
	constructor(public precedence = 0) {}

	parse(parser: Parser, token: TToken) {
		return new NameExpression(token[1])
	}
}

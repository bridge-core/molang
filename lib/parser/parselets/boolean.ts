import { IPrefixParselet } from './prefix'
import { TToken } from '../../tokenizer/token'
import { Parser } from '../parse'
import { BooleanExpression } from '../expressions/boolean'

export class BooleanParselet implements IPrefixParselet {
	constructor(public precedence = 0) {}

	parse(parser: Parser, token: TToken) {
		return new BooleanExpression(token[1] === 'true')
	}
}

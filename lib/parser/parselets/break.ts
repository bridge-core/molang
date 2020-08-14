import { Parser } from '../parse'
import { TToken } from '../../tokenizer/token'
import { IPrefixParselet } from './prefix'
import { BreakExpression } from '../expressions/break'

export class BreakParselet implements IPrefixParselet {
	constructor(public precedence = 0) {}

	parse(parser: Parser, token: TToken) {
		return new BreakExpression()
	}
}

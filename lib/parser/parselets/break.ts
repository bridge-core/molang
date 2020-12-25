import { Parser } from '../parse'
import { Token } from '../../tokenizer/token'
import { IPrefixParselet } from './prefix'
import { BreakExpression } from '../expressions/break'

export class BreakParselet implements IPrefixParselet {
	constructor(public precedence = 0) {}

	parse(parser: Parser, token: Token) {
		return new BreakExpression()
	}
}

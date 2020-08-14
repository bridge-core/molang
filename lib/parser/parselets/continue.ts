import { Parser } from '../parse'
import { TToken } from '../../tokenizer/token'
import { IPrefixParselet } from './prefix'
import { ContinueExpression } from '../expressions/continue'

export class ContinueParselet implements IPrefixParselet {
	constructor(public precedence = 0) {}

	parse(parser: Parser, token: TToken) {
		return new ContinueExpression()
	}
}

import { Parser } from '../parse'
import { Token } from '../../tokenizer/token'
import { IPrefixParselet } from './prefix'
import { ContinueExpression } from '../expressions/continue'

export class ContinueParselet implements IPrefixParselet {
	constructor(public precedence = 0) {}

	parse(parser: Parser, token: Token) {
		return new ContinueExpression()
	}
}

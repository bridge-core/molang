import { Parser } from '../parse'
import { TToken } from '../../tokenizer/token'
import { IPrefixParselet } from './prefix'
import { NumberExpression } from '../expressions/number'
import { ReturnExpression } from '../expressions/return'
import { EPrecedence } from '../precedence'

export class ReturnParselet implements IPrefixParselet {
	constructor(public precedence = 0) {}

	parse(parser: Parser, token: TToken) {
		const expr = parser.parseExpression(EPrecedence.STATEMENT)

		return new ReturnExpression(
			parser.match('SEMICOLON') ? expr : new NumberExpression(0)
		)
	}
}

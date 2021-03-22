import { Parser } from '../parse'
import { Token } from '../../tokenizer/token'
import { IPrefixParselet } from './prefix'
import { NumberExpression } from '../expressions/number'
import { ReturnExpression } from '../expressions/return'
import { EPrecedence } from '../precedence'

export class ReturnParselet implements IPrefixParselet {
	constructor(public precedence = 0) {}

	parse(parser: Parser, token: Token) {
		const expr = parser.parseExpression(EPrecedence.STATEMENT + 1)

		return new ReturnExpression(
			parser.match('SEMICOLON', false) ? expr : new NumberExpression(0)
		)
	}
}

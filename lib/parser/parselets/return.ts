import { Parser } from '../parse'
import { IExpression } from '../expression'
import { TToken } from '../../tokenizer/token'
import { PrefixExpression } from '../expressions/prefix'
import { IPrefixParselet } from './prefix'
import { NumberExpression } from '../expressions/number'
import { ReturnExpression } from '../expressions/return'
import { StatementExpression } from '../expressions/statement'

export class ReturnParselet implements IPrefixParselet {
	constructor(public precedence = 0) {}

	parse(parser: Parser, token: TToken) {
		const expr = parser.parseExpression()

		return new ReturnExpression(
			expr instanceof StatementExpression
				? expr.getExpression()
				: new NumberExpression(0)
		)
	}
}

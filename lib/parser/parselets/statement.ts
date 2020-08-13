import { Parser } from '../parse'
import { IExpression } from '../expression'
import { TToken } from '../../tokenizer/token'
import { IInfixParselet } from './infix'
import { StatementExpression } from '../expressions/statement'
import { ReturnExpression } from '../expressions/return'

export class StatementParselet implements IInfixParselet {
	constructor(public precedence = 0) {}

	parse(parser: Parser, left: IExpression, token: TToken) {
		const expr = parser.parseExpression()
		// console.log(
		// 	parser.useOptimizer,
		// 	left instanceof ReturnExpression,
		// 	left,
		// 	expr
		// )
		if (parser.useOptimizer && left instanceof ReturnExpression) return left
		return new StatementExpression(left, expr)
	}
}

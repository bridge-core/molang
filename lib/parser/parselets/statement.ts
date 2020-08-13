import { Parser } from '../parse'
import { IExpression } from '../expression'
import { TToken } from '../../tokenizer/token'
import { IInfixParselet } from './infix'
import { StatementExpression } from '../expressions/statement'
import { ReturnExpression } from '../expressions/return'
import { StaticExpression } from '../expressions/static'
import { EPrecedence } from '../precedence'

export class StatementParselet implements IInfixParselet {
	constructor(public precedence = 0) {}

	parse(parser: Parser, left: IExpression, token: TToken) {
		let expr = parser.parseExpression()

		const isRightStatic = parser.useOptimizer && expr.isStatic()
		const isLeftStatic = parser.useOptimizer && left.isStatic()

		if (parser.useOptimizer && left instanceof ReturnExpression) {
			if (isLeftStatic) return new StaticExpression(left.eval())
			return left
		}

		return new StatementExpression([
			left,
			isRightStatic
				? new StaticExpression(expr.eval(), expr.isReturn)
				: expr,
		])
	}
}

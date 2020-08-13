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
		const isLeftStatic = parser.useOptimizer && left.isStatic()
		if (parser.useOptimizer && left.isReturn) {
			if (isLeftStatic) left = new StaticExpression(left.eval())
			return left
		}

		let expr = parser.parseExpression(EPrecedence.STATEMENT)
		let expressions: IExpression[] = [left]
		while (parser.match('SEMICOLON') || expr.isReturn) {
			if (parser.useOptimizer) {
				if (expr.isStatic())
					expr = new StaticExpression(expr.eval(), expr.isReturn)
				if (expr.isReturn) {
					expressions.push(expr)
					break
				}
			}

			expressions.push(expr)
			expr = parser.parseExpression(EPrecedence.STATEMENT)
		}

		return new StatementExpression(expressions)
	}
}

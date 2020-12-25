import { Parser } from '../parse'
import { IExpression } from '../expression'
import { Token } from '../../tokenizer/token'
import { IInfixParselet } from './infix'
import { StatementExpression } from '../expressions/statement'
import { StaticExpression } from '../expressions/static'

export class StatementParselet implements IInfixParselet {
	constructor(public precedence = 0) {}

	parse(parser: Parser, left: IExpression, token: Token) {
		if (parser.useOptimizer) {
			if (left.isStatic())
				left = new StaticExpression(left.eval(), left.isReturn)
			if (left.isReturn) return left
		}

		let expr
		let expressions: IExpression[] = [left]
		do {
			expr = parser.parseExpression(this.precedence)
			if (parser.useOptimizer) {
				if (expr.isStatic()) {
					if (!expr.isReturn && parser.agressiveStaticOptimizer)
						continue
					else expr = new StaticExpression(expr.eval(), expr.isReturn)
				}

				if (expr.isReturn) {
					expressions.push(expr)
					break
				}
			}

			expressions.push(expr)
		} while (parser.match('SEMICOLON') || expr.isReturn)

		return new StatementExpression(expressions)
	}
}

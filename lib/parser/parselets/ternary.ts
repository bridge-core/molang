import { IInfixParselet } from './infix'
import { Parser } from '../parse'
import { IExpression } from '../expression'
import { Token } from '../../tokenizer/token'
import { TernaryExpression } from '../expressions/ternary'
import { VoidExpression } from '../expressions/void'

export class TernaryParselet implements IInfixParselet {
	exprName = 'Ternary'
	constructor(public precedence = 0) {}

	parse(parser: Parser, leftExpression: IExpression, token: Token) {
		let thenExpr = parser.parseExpression(this.precedence - 1)
		let elseExpr: IExpression

		if (parser.match('COLON')) {
			elseExpr = parser.parseExpression(this.precedence - 1)
		} else {
			elseExpr = new VoidExpression()
		}

		if (parser.config.useOptimizer && leftExpression.isStatic()) {
			return leftExpression.eval() ? thenExpr : elseExpr
		}

		return new TernaryExpression(leftExpression, thenExpr, elseExpr)
	}
}

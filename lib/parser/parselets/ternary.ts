import { IInfixParselet } from './infix'
import { Parser } from '../parse'
import { IExpression } from '../expression'
import { TToken } from '../../tokenizer/token'
import { TernaryExpression } from '../expressions/ternary'
import { NumberExpression } from '../expressions/number'
import { StatementExpression } from '../expressions/statement'

export class TernaryParselet implements IInfixParselet {
	exprName = 'Ternary'
	constructor(public precedence = 0) {}

	parse(parser: Parser, leftExpression: IExpression, token: TToken) {
		let thenExpr = parser.parseExpression(this.precedence - 1)
		let elseExpr: IExpression

		if (parser.match('COLON')) {
			elseExpr = parser.parseExpression(this.precedence - 1)
		} else if (parser.match('SEMICOLON', false)) {
			elseExpr = new NumberExpression(0)
		} else {
			throw new Error(
				`Binary conditional operator without ending semicolon.`
			)
		}

		return new TernaryExpression(leftExpression, thenExpr, elseExpr)
	}
}

import { IInfixParselet } from './infix'
import { Parser } from '../parse'
import { IExpression } from '../expression'
import { TToken } from '../../tokenizer/token'
import { TernaryExpression } from '../expressions/ternary'

export class TernaryParselet implements IInfixParselet {
	constructor(public precedence = 0) {}

	parse(parser: Parser, leftExpression: IExpression, token: TToken) {
		const thenExpr = parser.parseExpression()
		parser.consume('COLON')
		const elseExpr = parser.parseExpression()

		return new TernaryExpression(leftExpression, thenExpr, elseExpr)
	}
}

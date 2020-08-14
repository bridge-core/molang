import { TToken } from '../../tokenizer/token'
import { Parser } from '../parse'
import { IInfixParselet } from './infix'
import { IExpression } from '../expression'
import { ArrayAccessExpression } from '../expressions/arrayAccess'

export class ArrayAccessParselet implements IInfixParselet {
	constructor(public precedence = 0) {}

	parse(parser: Parser, left: IExpression, token: TToken) {
		const expr = parser.parseExpression(this.precedence - 1)

		if (!left.setPointer)
			throw new Error(`"${left.eval()}" is not an array`)

		if (!parser.match('ARRAY_RIGHT'))
			throw new Error(
				`No closing bracket for opening bracket "[${expr.eval()}"`
			)

		return new ArrayAccessExpression(left, expr)
	}
}

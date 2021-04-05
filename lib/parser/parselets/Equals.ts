import { Parser } from '../../parser/parse'
import { Token } from '../../tokenizer/token'
import { IExpression } from '../expression'
import { GenericOperatorExpression } from '../expressions/genericOperator'
import { IInfixParselet } from './infix'

export class EqualsOperator implements IInfixParselet {
	constructor(public precedence = 0) {}

	parse(parser: Parser, leftExpression: IExpression, token: Token) {
		return new GenericOperatorExpression(
			leftExpression,
			parser.parseExpression(this.precedence),
			'==',
			(leftExpression: IExpression, rightExpression: IExpression) =>
				leftExpression.eval() === rightExpression.eval()
		)
	}
}

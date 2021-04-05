import { Parser } from '../parse'
import { Token } from '../../tokenizer/token'
import { IExpression } from '../expression'
import { GenericOperatorExpression } from '../expressions/genericOperator'
import { IInfixParselet } from './infix'

export class GreaterOperator implements IInfixParselet {
	constructor(public precedence = 0) {}

	parse(parser: Parser, leftExpression: IExpression, token: Token) {
		if (parser.match('EQUALS'))
			return new GenericOperatorExpression(
				leftExpression,
				parser.parseExpression(this.precedence),
				'>=',
				(leftExpression: IExpression, rightExpression: IExpression) =>
					// @ts-ignore
					leftExpression.eval() >= rightExpression.eval()
			)
		else {
			return new GenericOperatorExpression(
				leftExpression,
				parser.parseExpression(this.precedence),
				'>',
				(leftExpression: IExpression, rightExpression: IExpression) =>
					// @ts-ignore
					leftExpression.eval() > rightExpression.eval()
			)
		}
	}
}

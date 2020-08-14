import { IInfixParselet } from './infix'
import { Parser } from '../parse'
import { IExpression } from '../expression'
import { TToken } from '../../tokenizer/token'
import { OperatorExpression } from '../expressions/operator'
import { NumericOperatorExpression } from '../expressions/numericOperator'

export class BinaryOperator implements IInfixParselet {
	constructor(public precedence = 0) {}

	parse(parser: Parser, leftExpression: IExpression, token: TToken) {
		if (
			token[1] === '+' ||
			token[1] === '-' ||
			token[1] === '*' ||
			token[1] === '/'
		)
			return new NumericOperatorExpression(
				leftExpression,
				token[1],
				parser.parseExpression(this.precedence)
			)
		return new OperatorExpression(
			leftExpression,
			token[1],
			parser.parseExpression(this.precedence)
		)
	}
}

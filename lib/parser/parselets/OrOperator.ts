import { Parser } from '../../parser/parse'
import { Token } from '../../tokenizer/token'
import { IExpression } from '../expression'
import { GenericOperatorExpression } from '../expressions/genericOperator'
import { IInfixParselet } from './infix'

export class OrOperator implements IInfixParselet {
	constructor(public precedence = 0) {}

	parse(parser: Parser, leftExpression: IExpression, token: Token) {
		if (parser.match('OR'))
			return new GenericOperatorExpression(
				leftExpression,
				parser.parseExpression(this.precedence),
				'||',
				(leftExpression: IExpression, rightExpression: IExpression) =>
					leftExpression.eval() || rightExpression.eval()
			)
		else throw new Error(`"|" not followed by another "|"`)
	}
}

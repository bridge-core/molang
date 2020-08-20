import { IInfixParselet } from './infix'
import { Parser } from '../parse'
import { IExpression } from '../expression'
import { TToken } from '../../tokenizer/token'
import { GenericOperatorExpression } from '../expressions/genericOperator'

export class BinaryOperator implements IInfixParselet {
	constructor(public precedence = 0) {}

	parse(parser: Parser, leftExpression: IExpression, token: TToken) {
		const rightExpression = parser.parseExpression(this.precedence)
		// return new AdditionExpression(leftExpression, rightExpression)

		switch (token[1]) {
			case '+':
				return new GenericOperatorExpression(
					leftExpression,
					rightExpression,
					() => {
						const leftValue = leftExpression.eval()
						const rightValue = rightExpression.eval()
						if (
							!(
								typeof leftValue === 'number' ||
								typeof rightValue === 'number' ||
								typeof leftValue === 'boolean' ||
								typeof rightValue === 'boolean'
							)
						)
							throw new Error(
								`Cannot use numeric operators for expression "${leftValue} ${token[1]} ${rightValue}"`
							)
						//@ts-ignore
						return leftValue + rightValue
					}
				)
			case '-':
				return new GenericOperatorExpression(
					leftExpression,
					rightExpression,
					() => {
						const leftValue = leftExpression.eval()
						const rightValue = rightExpression.eval()
						if (
							!(
								typeof leftValue === 'number' ||
								typeof rightValue === 'number' ||
								typeof leftValue === 'boolean' ||
								typeof rightValue === 'boolean'
							)
						)
							throw new Error(
								`Cannot use numeric operators for expression "${leftValue} ${token[1]} ${rightValue}"`
							)
						//@ts-ignore
						return leftValue - rightValue
					}
				)
			case '*':
				return new GenericOperatorExpression(
					leftExpression,
					rightExpression,
					() => {
						const leftValue = leftExpression.eval()
						const rightValue = rightExpression.eval()
						if (
							!(
								typeof leftValue === 'number' ||
								typeof rightValue === 'number' ||
								typeof leftValue === 'boolean' ||
								typeof rightValue === 'boolean'
							)
						)
							throw new Error(
								`Cannot use numeric operators for expression "${leftValue} ${token[1]} ${rightValue}"`
							)
						//@ts-ignore
						return leftValue * rightValue
					}
				)
			case '/':
				return new GenericOperatorExpression(
					leftExpression,
					rightExpression,
					//@ts-ignore
					() => {
						const leftValue = leftExpression.eval()
						const rightValue = rightExpression.eval()
						if (
							!(
								typeof leftValue === 'number' ||
								typeof rightValue === 'number' ||
								typeof leftValue === 'boolean' ||
								typeof rightValue === 'boolean'
							)
						)
							throw new Error(
								`Cannot use numeric operators for expression "${leftValue} ${token[1]} ${rightValue}"`
							)
						//@ts-ignore
						return leftValue / rightValue
					}
				)
			case '&&':
				return new GenericOperatorExpression(
					leftExpression,
					rightExpression,
					//@ts-ignore
					() => leftExpression.eval() && rightExpression.eval()
				)
			case '||':
				return new GenericOperatorExpression(
					leftExpression,
					rightExpression,
					//@ts-ignore
					() => leftExpression.eval() || rightExpression.eval()
				)
			case '<':
				return new GenericOperatorExpression(
					leftExpression,
					rightExpression,
					//@ts-ignore
					() => leftExpression.eval() < rightExpression.eval()
				)
			case '<=':
				return new GenericOperatorExpression(
					leftExpression,
					rightExpression,
					//@ts-ignore
					() => leftExpression.eval() <= rightExpression.eval()
				)
			case '>':
				return new GenericOperatorExpression(
					leftExpression,
					rightExpression,
					//@ts-ignore
					() => leftExpression.eval() > rightExpression.eval()
				)
			case '>=':
				return new GenericOperatorExpression(
					leftExpression,
					rightExpression,
					//@ts-ignore
					() => leftExpression.eval() >= rightExpression.eval()
				)
			case '==':
				return new GenericOperatorExpression(
					leftExpression,
					rightExpression,
					//@ts-ignore
					() => leftExpression.eval() === rightExpression.eval()
				)
			case '!=':
				return new GenericOperatorExpression(
					leftExpression,
					rightExpression,
					//@ts-ignore
					() => leftExpression.eval() !== rightExpression.eval()
				)
			case '??':
				return new GenericOperatorExpression(
					leftExpression,
					rightExpression,
					//@ts-ignore
					() => leftExpression.eval() ?? rightExpression.eval()
				)
			case '=':
				return new GenericOperatorExpression(
					leftExpression,
					rightExpression,
					() => {
						if (leftExpression.setPointer) {
							leftExpression.setPointer(rightExpression.eval())
							return 0
						} else {
							throw Error(
								`Cannot assign to "${leftExpression.eval()}"`
							)
						}
					}
				)
			default:
				throw new Error(`Operator not implemented`)
		}
	}
}

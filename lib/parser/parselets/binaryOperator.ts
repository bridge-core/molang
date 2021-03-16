import { IInfixParselet } from './infix'
import { Parser } from '../parse'
import { IExpression } from '../expression'
import { Token } from '../../tokenizer/token'
import { GenericOperatorExpression } from '../expressions/genericOperator'

export class BinaryOperator implements IInfixParselet {
	constructor(public precedence = 0) {}

	parse(parser: Parser, leftExpression: IExpression, token: Token) {
		const rightExpression = parser.parseExpression(this.precedence)
		// return new AdditionExpression(leftExpression, rightExpression)

		const tokenText = token.getText()

		switch (tokenText) {
			case '+':
				return new GenericOperatorExpression(
					leftExpression,
					rightExpression,
					tokenText,
					() => {
						const leftValue = leftExpression.eval()
						const rightValue = rightExpression.eval()
						if (
							!(
								typeof leftValue === 'number' ||
								typeof leftValue === 'boolean'
							) ||
							!(
								typeof rightValue === 'number' ||
								typeof rightValue === 'boolean'
							)
						)
							throw new Error(
								`Cannot use numeric operators for expression "${leftValue} ${tokenText} ${rightValue}"`
							)
						//@ts-ignore
						return leftValue + rightValue
					}
				)
			case '-':
				return new GenericOperatorExpression(
					leftExpression,
					rightExpression,
					tokenText,
					() => {
						const leftValue = leftExpression.eval()
						const rightValue = rightExpression.eval()
						if (
							!(
								typeof leftValue === 'number' ||
								typeof leftValue === 'boolean'
							) ||
							!(
								typeof rightValue === 'number' ||
								typeof rightValue === 'boolean'
							)
						)
							throw new Error(
								`Cannot use numeric operators for expression "${leftValue} ${tokenText} ${rightValue}"`
							)
						//@ts-ignore
						return leftValue - rightValue
					}
				)
			case '*':
				return new GenericOperatorExpression(
					leftExpression,
					rightExpression,
					tokenText,
					() => {
						const leftValue = leftExpression.eval()
						const rightValue = rightExpression.eval()
						if (
							!(
								typeof leftValue === 'number' ||
								typeof leftValue === 'boolean'
							) ||
							!(
								typeof rightValue === 'number' ||
								typeof rightValue === 'boolean'
							)
						)
							throw new Error(
								`Cannot use numeric operators for expression "${leftValue} ${tokenText} ${rightValue}"`
							)
						//@ts-ignore
						return leftValue * rightValue
					}
				)
			case '/':
				return new GenericOperatorExpression(
					leftExpression,
					rightExpression,
					tokenText,
					//@ts-ignore
					() => {
						const leftValue = leftExpression.eval()
						const rightValue = rightExpression.eval()
						if (
							!(
								typeof leftValue === 'number' ||
								typeof leftValue === 'boolean'
							) ||
							!(
								typeof rightValue === 'number' ||
								typeof rightValue === 'boolean'
							)
						)
							throw new Error(
								`Cannot use numeric operators for expression "${leftValue} ${tokenText} ${rightValue}"`
							)
						//@ts-ignore
						return leftValue / rightValue
					}
				)
			case '&&':
				return new GenericOperatorExpression(
					leftExpression,
					rightExpression,
					tokenText,
					//@ts-ignore
					() => leftExpression.eval() && rightExpression.eval()
				)
			case '||':
				return new GenericOperatorExpression(
					leftExpression,
					rightExpression,
					tokenText,
					//@ts-ignore
					() => leftExpression.eval() || rightExpression.eval()
				)
			case '<':
				return new GenericOperatorExpression(
					leftExpression,
					rightExpression,
					tokenText,
					//@ts-ignore
					() => leftExpression.eval() < rightExpression.eval()
				)
			case '<=':
				return new GenericOperatorExpression(
					leftExpression,
					rightExpression,
					tokenText,
					//@ts-ignore
					() => leftExpression.eval() <= rightExpression.eval()
				)
			case '>':
				return new GenericOperatorExpression(
					leftExpression,
					rightExpression,
					tokenText,
					//@ts-ignore
					() => leftExpression.eval() > rightExpression.eval()
				)
			case '>=':
				return new GenericOperatorExpression(
					leftExpression,
					rightExpression,
					tokenText,
					//@ts-ignore
					() => leftExpression.eval() >= rightExpression.eval()
				)
			case '==':
				return new GenericOperatorExpression(
					leftExpression,
					rightExpression,
					tokenText,
					//@ts-ignore
					() => leftExpression.eval() === rightExpression.eval()
				)
			case '!=':
				return new GenericOperatorExpression(
					leftExpression,
					rightExpression,
					tokenText,
					//@ts-ignore
					() => leftExpression.eval() !== rightExpression.eval()
				)
			case '??':
				return new GenericOperatorExpression(
					leftExpression,
					rightExpression,
					tokenText,
					//@ts-ignore
					() => leftExpression.eval() ?? rightExpression.eval()
				)
			case '=':
				return new GenericOperatorExpression(
					leftExpression,
					rightExpression,
					tokenText,
					() => {
						if (leftExpression.setPointer) {
							leftExpression.setPointer(rightExpression.eval())
							return 0
						} else {
							throw Error(
								`Cannot assign to ${leftExpression.type}`
							)
						}
					}
				)
			default:
				throw new Error(`Operator not implemented`)
		}
	}
}

import { IInfixParselet } from './infix'
import { Parser } from '../parse'
import { IExpression } from '../expression'
import { Token } from '../../tokenizer/token'
import { GenericOperatorExpression } from '../expressions/genericOperator'

const plusHelper = (
	leftExpression: IExpression,
	rightExpression: IExpression
) => {
	const leftValue = leftExpression.eval()
	const rightValue = rightExpression.eval()
	if (
		!(typeof leftValue === 'number' || typeof leftValue === 'boolean') ||
		!(typeof rightValue === 'number' || typeof rightValue === 'boolean')
	)
		throw new Error(
			`Cannot use numeric operators for expression "${leftValue} + ${rightValue}"`
		)
	//@ts-ignore
	return leftValue + rightValue
}
const minusHelper = (
	leftExpression: IExpression,
	rightExpression: IExpression
) => {
	const leftValue = leftExpression.eval()
	const rightValue = rightExpression.eval()
	if (
		!(typeof leftValue === 'number' || typeof leftValue === 'boolean') ||
		!(typeof rightValue === 'number' || typeof rightValue === 'boolean')
	)
		throw new Error(
			`Cannot use numeric operators for expression "${leftValue} - ${rightValue}"`
		)
	//@ts-ignore
	return leftValue - rightValue
}
const divideHelper = (
	leftExpression: IExpression,
	rightExpression: IExpression
) => {
	const leftValue = leftExpression.eval()
	const rightValue = rightExpression.eval()
	if (
		!(typeof leftValue === 'number' || typeof leftValue === 'boolean') ||
		!(typeof rightValue === 'number' || typeof rightValue === 'boolean')
	)
		throw new Error(
			`Cannot use numeric operators for expression "${leftValue} / ${rightValue}"`
		)
	//@ts-ignore
	return leftValue / rightValue
}
const multiplyHelper = (
	leftExpression: IExpression,
	rightExpression: IExpression
) => {
	const leftValue = leftExpression.eval()
	const rightValue = rightExpression.eval()
	if (
		!(typeof leftValue === 'number' || typeof leftValue === 'boolean') ||
		!(typeof rightValue === 'number' || typeof rightValue === 'boolean')
	)
		throw new Error(
			`Cannot use numeric operators for expression "${leftValue} * ${rightValue}"`
		)
	//@ts-ignore
	return leftValue * rightValue
}
const assignHelper = (
	leftExpression: IExpression,
	rightExpression: IExpression
) => {
	if (leftExpression.setPointer) {
		leftExpression.setPointer(rightExpression.eval())
		return 0
	} else {
		throw Error(`Cannot assign to ${leftExpression.type}`)
	}
}

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
					plusHelper
				)
			case '-':
				return new GenericOperatorExpression(
					leftExpression,
					rightExpression,
					tokenText,
					minusHelper
				)
			case '*':
				return new GenericOperatorExpression(
					leftExpression,
					rightExpression,
					tokenText,
					multiplyHelper
				)
			case '/':
				return new GenericOperatorExpression(
					leftExpression,
					rightExpression,
					tokenText,
					divideHelper
				)
			case '=': {
				return new GenericOperatorExpression(
					leftExpression,
					rightExpression,
					'=',
					assignHelper
				)
			}

			default:
				throw new Error(`Operator not implemented`)
		}
	}
}

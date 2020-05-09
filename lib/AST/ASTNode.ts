import { ITestResult, createNode } from './create'
import { NumberNode } from './Nodes/export'
import { CONFIG } from '../config'

export type TEvalResult = [boolean, string | number]

export abstract class ASTNode {
	abstract type: string
	public static priority: number = 0
	protected children: ASTNode[] = []

	abstract toString(): string
	eval(...args: unknown[]): TEvalResult {
		return [false, this.toString()]
	}

	test(_: string): ITestResult {
		return {
			isCorrectToken: false,
		}
	}
}

/**
 * Parses single character front operator
 */
export abstract class UnaryNode extends ASTNode {
	constructor(protected operator: string, expression: string) {
		super()
		this.children = [
			createNode(
				expression.substring(this.operator.length, expression.length)
			),
		]
	}

	eval() {
		return this.children[0].eval()
	}

	toString() {
		return `${this.operator}${this.children[0].toString()}`
	}
}
export function testUnaryHelper(expression: string, operator: string) {
	if (expression.length < operator.length) return false

	return operator.length === 1
		? expression[0] === operator
		: expression.startsWith(operator)
}

/**
 * Parses binary operators of length 1 or 2
 */
export abstract class BinaryNode extends ASTNode {
	protected collectedIndex: number = -1
	constructor(protected operator: string, getSplitStrings: () => string[]) {
		super()

		// if (
		// 	CONFIG.useOptimizer &&
		// 	this.children[0].type === 'MoLang.NumberNode' &&
		// 	this.children[1].type === 'MoLang.NumberNode'
		// )
		// 	return new NumberNode(<number>this.eval().value)
		// //Strings can currently only be compared, result must be number
		// if (
		// 	CONFIG.useOptimizer &&
		// 	this.children[0].type === 'MoLang.StringNode' &&
		// 	this.children[1].type === 'MoLang.StringNode'
		// )
		// 	return new NumberNode(<number>this.eval().value)

		const split = getSplitStrings()
		this.children.push(createNode(split[0]))
		this.children.push(createNode(split[1]))
	}

	toString() {
		return `${this.children[0].toString()} ${
			this.operator
		} ${this.children[1].toString()}`
	}

	eval(): TEvalResult {
		return [false, 0]
	}

	protected evalHelper() {
		const [_1, val1] = this.children[0].eval()
		const [_2, val2] = this.children[1].eval()
		if (typeof val1 === 'string' || typeof val2 === 'string')
			throw new Error(
				`Cannot use '${this.operator}' operator with string "${val1} ${this.operator} ${val2}"`
			)

		return [val1, val2]
	}
}
export function testBinaryHelper(expression: string, operator: string) {
	const brackets = {
		default: 0,
		squirly: 0,
		square: 0,
	}

	const increase = operator.length
	let i = 0
	while (i < expression.length) {
		const char = expression[i]
		const nextChar = expression[i + 1]

		if (char === '(') brackets.default++
		else if (char === ')') brackets.default--
		else if (char === '[') brackets.square++
		else if (char === ']') brackets.square--
		else if (char === '{') brackets.squirly++
		else if (char === '}') brackets.squirly--
		else if (
			i !== 0 &&
			brackets.default === 0 &&
			brackets.square === 0 &&
			brackets.squirly === 0
		) {
			const potentialOp = expression.substring(i, i + increase)

			if (potentialOp === operator) {
				return {
					isCorrectToken: true,
					getSplitStrings: () => {
						return [
							expression.substring(0, i),
							expression.substring(
								i + increase,
								expression.length
							),
						]
					},
				}
			}
		}

		i++
	}

	return {
		isCorrectToken: false,
	}
}

/**
 * Parses n* single character operators
 */
export abstract class ChainNode extends ASTNode {
	constructor(protected operators: string, getSplitStrings: () => string[]) {
		super()

		const split = getSplitStrings()
		let i = 0
		while (i < split.length) {
			this.children.push(createNode(split[i]))
			i++
		}
	}

	toString() {
		let str = this.children[0].toString()

		let i = 0
		while (i < this.operators.length) {
			str += ` ${this.operators[i]} ${this.children[i + 1].toString()}`
			i++
		}

		return str
	}
}
export function testChainHelper(expression: string, operators: string) {
	const brackets = {
		default: 0,
		squirly: 0,
		square: 0,
	}

	let searchCharIndex = 0
	let splitPoints = [-1]
	let i = 0
	while (i < expression.length) {
		const char = expression[i]

		if (char === '(') brackets.default++
		else if (char === ')') brackets.default--
		else if (char === '[') brackets.square++
		else if (char === ']') brackets.square--
		else if (char === '{') brackets.squirly++
		else if (char === '}') brackets.squirly--
		else if (
			brackets.default === 0 &&
			brackets.square === 0 &&
			brackets.squirly === 0 &&
			char === operators[searchCharIndex]
		) {
			searchCharIndex++
			splitPoints.push(i)
		}

		if (searchCharIndex === operators.length)
			return {
				isCorrectToken: true,
				getSplitStrings: () => {
					splitPoints.push(expression.length)
					const res: string[] = []

					let j = 1
					while (j < splitPoints.length) {
						res.push(
							expression.substring(
								splitPoints[j - 1] + 1,
								splitPoints[j]
							)
						)
						j++
					}

					return res
				},
			}

		i++
	}

	return {
		isCorrectToken: false,
	}
}

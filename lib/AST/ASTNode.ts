import { ITestResult, createNode } from './create'
import { NumberNode } from './Nodes/export'
import { CONFIG } from '../config'

export interface IEvalResult {
	isReturn?: boolean
	value: number | string
}

export abstract class ASTNode {
	abstract type: string
	public static priority: number = 0
	protected children: ASTNode[] = []

	abstract toString(): string
	abstract createChildren(
		expression: string | number,
		getSplitStrings?: () => string[]
	): ASTNode
	eval(...args: unknown[]): IEvalResult {
		return {
			value: this.toString(),
		}
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
	constructor(protected operator: string) {
		super()
	}

	createChildren(expression: string) {
		this.children = [
			createNode(
				expression.substring(this.operator.length, expression.length)
			),
		]
		return this
	}

	eval() {
		return this.children[0].eval()
	}

	toString() {
		return `${this.operator}${this.children[0].toString()}`
	}

	test(expression: string): ITestResult {
		if (expression.length < this.operator.length)
			return { isCorrectToken: false }

		return {
			isCorrectToken:
				this.operator.length === 1
					? expression[0] === this.operator
					: expression.startsWith(this.operator),
		}
	}
}

/**
 * Parses binary operators of length 1 or 2
 */
export abstract class BinaryNode extends ASTNode {
	protected collectedIndex: number = -1
	constructor(protected operator: string) {
		super()
	}
	collect(op: string, index: number) {
		if (
			this.operator.length === 1 &&
			op[0] === this.operator &&
			this.collectedIndex === -1
		)
			this.collectedIndex = index
		else if (op === this.operator && this.collectedIndex === -1)
			this.collectedIndex = index
	}
	getCollected() {
		return this.collectedIndex
	}

	createChildren(
		expression: string,
		getSplitStrings?: () => string[]
	): ASTNode {
		this.children =
			getSplitStrings?.()?.map((expr) => createNode(expr)) ?? []

		if (
			CONFIG.useOptimizer &&
			this.children[0].type === 'MoLang.NumberNode' &&
			this.children[1].type === 'MoLang.NumberNode'
		)
			return new NumberNode(<number>this.eval().value)
		//Strings can currently only be compared, result must be number
		if (
			CONFIG.useOptimizer &&
			this.children[0].type === 'MoLang.StringNode' &&
			this.children[1].type === 'MoLang.StringNode'
		)
			return new NumberNode(<number>this.eval().value)
		return this
	}

	toString() {
		return `${this.children[0].toString()} ${
			this.operator
		} ${this.children[1].toString()}`
	}

	eval(): IEvalResult {
		return {
			isReturn: false,
			value: 0,
		}
	}

	protected evalHelper() {
		const { value: val1 } = this.children[0].eval()
		const { value: val2 } = this.children[1].eval()
		if (typeof val1 === 'string' || typeof val2 === 'string')
			throw new Error(
				`Cannot use '${this.operator}' operator with string "${val1} ${this.operator} ${val2}"`
			)

		return {
			val1,
			val2,
		}
	}

	test(expression: string) {
		const brackets = {
			default: 0,
			squirly: 0,
			square: 0,
		}

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
				i !== 0 &&
				brackets.default === 0 &&
				brackets.square === 0 &&
				brackets.squirly === 0
			) {
				const potentialOp = expression.substr(i, this.operator.length)
				if (potentialOp === this.operator)
					return {
						isCorrectToken: true,
						getSplitStrings: () => {
							return [
								expression.substring(0, i),
								expression.substring(
									i + this.operator.length,
									expression.length
								),
							]
						},
					}
			}

			i++
		}

		return {
			isCorrectToken: false,
		}
	}
}

/**
 * Parses n* single character operators
 */
export abstract class ChainNode extends ASTNode {
	constructor(protected operators: string) {
		super()
	}

	createChildren(_: string, getSplitStrings?: () => string[]) {
		this.children =
			getSplitStrings?.()?.map((expr) => createNode(expr)) ?? []
		return this
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

	test(expression: string) {
		const brackets = {
			default: 0,
			squirly: 0,
			square: 0,
		}
		const outsideBrackets = () => {
			return (
				brackets.default === 0 &&
				brackets.square === 0 &&
				brackets.squirly === 0
			)
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
				outsideBrackets() &&
				char === this.operators[searchCharIndex]
			) {
				searchCharIndex++
				splitPoints.push(i)
			}

			if (searchCharIndex === this.operators.length)
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
}

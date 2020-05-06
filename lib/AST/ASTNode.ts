import { ITestResult, createNode } from './create'

export abstract class ASTNode {
	abstract type: string
	public static priority: number = 0
	protected children: ASTNode[] = []

	abstract toString(): string
	abstract createChildren(
		expression: string,
		getSplitStrings?: () => string[]
	): ASTNode
	eval(): unknown {
		return this.toString()
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

	toString() {
		return `${this.operator}${this.children[0].toString()}`
	}

	test(expression: string): ITestResult {
		return {
			isCorrectToken: expression[0] === this.operator,
		}
	}
}

/**
 * Parses binary operators of length 1 or 2
 */
export abstract class BinaryNode extends ASTNode {
	constructor(protected operator: string) {
		super()
	}

	createChildren(_: string, getSplitStrings?: () => string[]) {
		this.children =
			getSplitStrings?.()?.map((expr) => createNode(expr)) ?? []
		return this
	}

	toString() {
		return `${this.children[0].toString()} ${
			this.operator
		} ${this.children[1].toString()}`
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

		for (let i = 0; i < expression.length; i++) {
			const char = expression[i]

			if (char === '(') brackets.default++
			else if (char === ')') brackets.default--
			else if (char === '[') brackets.square++
			else if (char === ']') brackets.square--
			else if (char === '{') brackets.squirly++
			else if (char === '}') brackets.squirly--
			else if (
				this.operator.length === 1 &&
				outsideBrackets() &&
				char === this.operator
			)
				return {
					isCorrectToken: true,
					getSplitStrings: () => {
						return [
							expression.substring(0, i),
							expression.substring(i + 1, expression.length),
						]
					},
				}
			else if (
				this.operator.length === 2 &&
				outsideBrackets() &&
				char === this.operator[0] &&
				expression[i + 1] === this.operator[1]
			)
				return {
					isCorrectToken: true,
					getSplitStrings: () => {
						return [
							expression.substring(0, i),
							expression.substring(i + 2, expression.length),
						]
					},
				}
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

		for (let i = 0; i < this.operators.length; i++)
			str += ` ${this.operators[i]} ${this.children[i + 1].toString()}`

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
		for (let i = 0; i < expression.length; i++) {
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

						for (let j = 1; j < splitPoints.length; j++)
							res.push(
								expression.substring(
									splitPoints[j - 1] + 1,
									splitPoints[j]
								)
							)

						return res
					},
				}
		}

		return {
			isCorrectToken: false,
		}
	}
}

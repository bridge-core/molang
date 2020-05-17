import { ASTNode, TEvalResult } from '../../ASTNode'
import { ENV } from '../../ENV'
import { createNode } from '../../create'

export class PropertyNode extends ASTNode {
	type = 'MoLang.PropertyNode'
	protected path: (string | ASTNode)[] = []
	constructor(protected expression: string) {
		super()
		const rawPath = parseProperty(expression)

		let i = 0
		while (i < rawPath.length) {
			const currentFraction = rawPath[i]

			if (currentFraction[currentFraction.length - 1] === ']') {
				const index = currentFraction.indexOf('[')

				this.path.push(currentFraction.substring(0, index))
				this.path.push(
					createNode(
						currentFraction.substring(
							index + 1,
							currentFraction.length - 1
						)
					)
				)
			} else {
				this.path.push(currentFraction)
			}

			i++
		}
	}

	findValue() {
		let i = 1
		//First path element must be a string because a property may not start with an array accessor
		let current = ENV.value[<string>this.path[0]]
		while (i < this.path.length) {
			if (typeof this.path[i] === 'string')
				current = current[<string>this.path[i]]
			else current = current[(<ASTNode>this.path[i]).eval()[1]]

			i++
		}

		return current
	}
	set([_, val]: TEvalResult) {
		let i = 1
		//First path element must be a string because a property may not start with an array accessor
		let current = ENV.value[<string>this.path[0]]
		while (i < this.path.length - 1) {
			if (typeof this.path[i] === 'string')
				current = current[<string>this.path[i]]
			else current = current[(<ASTNode>this.path[i]).eval()[1]]

			i++
		}

		if (typeof this.path[i] === 'string')
			current[<string>this.path[i]] = val
		else current[(<ASTNode>this.path[i]).eval()[1]] = val

		return 0.0
	}
	eval(...args: unknown[]): TEvalResult {
		const value = this.findValue()
		if (typeof value === 'function') return [false, value(...args)]
		else if (value !== undefined) return [false, value]
		else
			throw new Error(
				`Undefined property reference: "${this.expression}"`
			)
	}
	toString() {
		return this.expression
	}
}

export function testProperty(expression: string) {
	if (/(([aA-zZ]([aA-zZ]|[0-9]|)*)\.?)+/y.test(expression))
		return new PropertyNode(expression)
}

function parseProperty(str: string) {
	const res: string[] = []
	let defaultBracket = 0
	let squirlyBracket = 0
	let squareBracket = 0
	let lastSplit = 0

	let i = 0
	while (i < str.length) {
		const char = str[i]

		if (char === '(') defaultBracket++
		else if (char === ')') defaultBracket--
		else if (char === '[') squareBracket++
		else if (char === ']') squareBracket--
		else if (char === '{') squirlyBracket++
		else if (char === '}') squirlyBracket--
		else if (
			defaultBracket === 0 &&
			squareBracket === 0 &&
			squirlyBracket === 0 &&
			char === '.'
		) {
			res.push(str.substring(lastSplit, i))
			lastSplit = i + 1
		}

		i++
	}

	res.push(str.substring(lastSplit, str.length))
	return res
}

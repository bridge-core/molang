import { ASTNode } from '../../ASTNode'
import { createNode } from '../../create'

export class FunctionCallNode extends ASTNode {
	type = 'MoLang.FunctionCallNode'
	constructor(expression: string) {
		super()

		const index = expression.indexOf('(')
		const [body, callSignatures] = [
			expression.substring(0, index),
			expression.substring(index + 1, expression.length),
		]
		this.children = [
			createNode(body),
			...splitInner(
				callSignatures.substring(0, callSignatures.length - 1),
				','
			)
				.filter((arg) => arg !== '')
				.map((arg) => createNode(arg)),
		]
	}

	eval() {
		return this.children[0].eval(
			...this.children.slice(1).map((c) => c.eval()[1])
		)
	}
	toString() {
		return `${this.children[0].toString()}(${this.children
			.slice(1)
			.map((c) => c.toString())
			.join(', ')})`
	}
}

export function testFunctionCall(expression: string) {
	if (
		/(([aA-zZ]([aA-zZ]|[0-9]|)*)\.?)+\(.*\)/y.test(expression) &&
		expression[expression.length - 1] === ')'
	)
		return new FunctionCallNode(expression)
}

function splitInner(str: string, splitChar: string) {
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
			char === splitChar
		) {
			res.push(str.substring(lastSplit, i))
			lastSplit = i + 1
		}

		i++
	}

	res.push(str.substring(lastSplit, str.length))
	return res
}

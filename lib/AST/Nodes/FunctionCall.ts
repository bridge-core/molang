import { ASTNode } from '../ASTNode'
import { createNode } from '../create'

export class FunctionCallNode extends ASTNode {
	type = 'MoLang.FunctionCallNode'

	createChildren(expression: string) {
		const index = expression.indexOf('(')
		const [body, callSignatures] = [
			expression.substring(0, index),
			expression.substring(index + 1, expression.length),
		]
		this.children = [
			createNode(body),
			...callSignatures
				.substring(0, callSignatures.length - 1)
				.split(',')
				.map((arg) => createNode(arg)),
		]
		return this
	}

	toString() {
		return `${this.children[0].toString()}(${this.children
			.slice(1)
			.map((c) => c.toString())
			.join(', ')})`
	}

	test(expression: string) {
		return {
			isCorrectToken: /(([aA-zZ]([aA-zZ]|[0-9]|)*)\.?)+\(.*\)/y.test(
				expression
			),
		}
	}
}

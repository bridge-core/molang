import { ASTNode } from '../../ASTNode'
import { createNode } from '../../create'

export class GroupNode extends ASTNode {
	type = 'MoLang.GroupNode'
	constructor(protected operators = '()') {
		super()
	}

	createChildren(expression: string) {
		this.children = [
			createNode(expression.substring(1, expression.length - 1)),
		]
		return this
	}

	eval() {
		return this.children[0].eval()
	}

	toString() {
		return `${this.operators[0]}${this.children[0].toString()}${
			this.operators[1]
		}`
	}

	test(expression: string) {
		return {
			isCorrectToken:
				expression[0] === this.operators[0] &&
				expression[expression.length - 1] === this.operators[1],
		}
	}
}

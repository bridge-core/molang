import { ASTNode } from '../../ASTNode'
import { createNode } from '../../create'

export class GroupNode extends ASTNode {
	type = 'MoLang.GroupNode'
	constructor(
		protected operators = '()',
		expression: string,
		addChildren = true
	) {
		super()
		if (addChildren)
			this.children = [
				createNode(expression.substring(1, expression.length - 1)),
			]
	}

	eval() {
		return this.children[0].eval()
	}

	toString() {
		return `${this.operators[0]}${this.children[0].toString()}${
			this.operators[1]
		}`
	}
}

export function testGroupHelper(expression: string, operators = '()') {
	return (
		expression[0] === operators[0] &&
		expression[expression.length - 1] === operators[1]
	)
}

export function testGroup(expression: string) {
	if (testGroupHelper(expression)) return new GroupNode('()', expression)
}

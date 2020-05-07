import { ASTNode } from '../ASTNode'
import { createNode } from '../create'

export class ExecutionGroupNode extends ASTNode {
	type = 'MoLang.ExecutionGroupNode'

	createChildren(expression: string) {
		this.children = expression
			.split(';')
			.filter((expr) => expr !== '')
			.map((expr) => createNode(expr))
		return this
	}

	eval() {
		//If only one statement: Always return
		if (this.children.length === 1) return this.children[0].eval()

		for (let c of this.children) {
			const { isReturn, value } = c.eval()
			if (isReturn)
				return {
					isReturn,
					value,
				}
		}

		//Multiple statements without a return always evaluate to 0
		return {
			value: 0,
		}
	}

	toString() {
		return this.children.map((c) => c.toString()).join('; ')
	}

	test(_: string) {
		return {
			isCorrectToken: false,
		}
	}
}

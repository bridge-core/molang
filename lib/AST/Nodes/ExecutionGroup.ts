import { ASTNode } from '../ASTNode'
import { createNode } from '../create'

export class ExecutionGroupNode extends ASTNode {
	type = 'MoLang.ExecutionGroupNode'

	createChildren(expression: string) {
		const split = expression.split(';').filter((expr) => expr !== '')
		for (let expr of split) {
			const node = createNode(expr)
			this.children.push(node)

			if (node.type === 'MoLang.ReturnNode') return this
		}
		return this
	}

	eval() {
		//If only one statement: Always return
		if (this.children.length === 1) {
			const { isReturn, value } = this.children[0].eval()
			return { isReturn, value: isReturn ? 0.0 : value }
		}

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
		if (this.children.length === 1) {
			return this.children[0].type === 'Molang.ReturnNode'
				? `${this.children[0].toString()};`
				: this.children[0].toString()
		}

		return `${this.children.map((c) => c.toString()).join('; ')};`
	}

	test(_: string) {
		return {
			isCorrectToken: false,
		}
	}
}

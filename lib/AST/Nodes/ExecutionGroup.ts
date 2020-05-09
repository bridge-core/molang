import { ASTNode } from '../ASTNode'
import { createNode } from '../create'
import { CONFIG } from '../../config'

export class ExecutionGroupNode extends ASTNode {
	type = 'MoLang.ExecutionGroupNode'

	createChildren(expression: string): ASTNode {
		const split = expression.split(';').filter((expr) => expr !== '')
		if (split.length === 1) {
			this.children.push(createNode(split[0]))
			return this
		}

		for (let i = 0; i < split.length; i++) {
			const node = createNode(split[i])

			//All statements that need to be evaluated contain an assignment or are return statements
			if (
				!CONFIG.useOptimizer ||
				node.type === 'MoLang.ReturnNode' ||
				node.type === 'MoLang.AssignmentNode'
			)
				this.children.push(node)

			if (CONFIG.useOptimizer && node.type === 'MoLang.ReturnNode')
				return this
		}
		return this
	}

	eval() {
		//If only one statement: Always return
		if (this.children.length === 1) {
			if (CONFIG.useOptimizer) return this.children[0].eval()

			//This is normally the correct behavior but it breaks the optimizing parser
			const { isReturn, value } = this.children[0].eval()
			return { isReturn, value: isReturn ? 0.0 : value }
		}

		for (let i = 0; i < this.children.length; i++) {
			const { isReturn, value } = this.children[i].eval()
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

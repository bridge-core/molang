import { ASTNode, TEvalResult } from '../ASTNode'
import { createNode } from '../create'
import { CONFIG } from '../../config'

export class ExecutionGroupNode extends ASTNode {
	type = 'MoLang.ExecutionGroupNode'
	protected endsWithSemicolon: boolean
	constructor(expression: string) {
		super()
		this.endsWithSemicolon = expression[expression.length - 1] === ';'

		const useOptimizer = CONFIG.get('useOptimizer')
		const split = expression.split(';').filter((expr) => expr !== '')
		if (split.length === 1) {
			this.children.push(createNode(split[0], undefined, useOptimizer))
			return
		}

		let i = 0
		while (i < split.length) {
			const node = createNode(split[i])

			//All statements that need to be evaluated contain an assignment or are return statements
			if (
				!useOptimizer ||
				node.type === 'MoLang.ReturnNode' ||
				node.type === 'MoLang.AssignmentNode'
			)
				this.children.push(node)

			if (useOptimizer && node.type === 'MoLang.ReturnNode') return

			i++
		}
	}

	eval(): TEvalResult {
		//If only one statement: Return if semicolon at end of statement
		if (this.children.length === 1) {
			const [isReturn, value] = this.children[0].eval()
			return [isReturn, isReturn && !this.endsWithSemicolon ? 0.0 : value]
		}

		let i = 0
		while (i < this.children.length) {
			const [isReturn, value] = this.children[i].eval()
			if (isReturn) return [isReturn, value]

			i++
		}

		//Multiple statements without a return always evaluate to 0
		return [false, 0]
	}

	toString() {
		if (this.children.length === 1) {
			return this.children[0].type === 'Molang.ReturnNode'
				? `${this.children[0].toString()};`
				: this.children[0].toString()
		}

		return `${this.children.map((c) => c.toString()).join('; ')};`
	}
}

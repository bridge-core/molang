import { BinaryNode } from '../../ASTNode'

export class IfNode extends BinaryNode {
	type = 'MoLang.IfNode'
	constructor() {
		super('?')
	}

	eval() {
		const { value } = this.children[0].eval()

		if (value) return this.children[1].eval()
		else return { value: 0 }
	}
}

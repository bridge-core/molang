import { BinaryNode } from '../../ASTNode'

export class AssignmentNode extends BinaryNode {
	type = 'MoLang.AssignmentNode'
	constructor() {
		super('=')
	}

	eval() {
		return {
			value: Number(
				this.children[0].eval().value === this.children[1].eval().value
			),
		}
	}
}

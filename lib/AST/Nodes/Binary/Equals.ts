import { BinaryNode } from '../../ASTNode'

export class EqualsNode extends BinaryNode {
	type = 'MoLang.EqualsNode'
	constructor() {
		super('==')
	}

	eval() {
		return {
			value: Number(
				this.children[0].eval().value === this.children[1].eval().value
			),
		}
	}
}

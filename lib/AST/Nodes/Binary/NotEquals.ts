import { BinaryNode } from '../../ASTNode'

export class NotEqualsNode extends BinaryNode {
	type = 'MoLang.NotEqualsNode'
	constructor() {
		super('!=')
	}

	eval() {
		return {
			value: Number(
				this.children[0].eval().value !== this.children[1].eval().value
			),
		}
	}
}

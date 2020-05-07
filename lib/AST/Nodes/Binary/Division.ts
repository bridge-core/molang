import { BinaryNode } from '../../ASTNode'

export class DivisionNode extends BinaryNode {
	type = 'MoLang.DivisionNode'
	constructor() {
		super('/')
	}

	eval() {
		const { val1, val2 } = this.evalHelper()

		return {
			value: val1 / val2,
		}
	}
}

import { BinaryNode } from '../../ASTNode'

export class DisjunctionNode extends BinaryNode {
	type = 'MoLang.DisjunctionNode'
	constructor() {
		super('||')
	}

	eval() {
		const { val1, val2 } = this.evalHelper()

		return {
			value: Number(Boolean(val1 || val2)),
		}
	}
}

import { BinaryNode } from '../../ASTNode'

export class GreaterNode extends BinaryNode {
	type = 'MoLang.GreaterNode'
	constructor() {
		super('>')
	}

	eval() {
		const { val1, val2 } = this.evalHelper()

		return {
			value: Number(Boolean(val1 > val2)),
		}
	}
}

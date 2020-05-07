import { BinaryNode } from '../../ASTNode'

export class SmallerOrEqualsNode extends BinaryNode {
	type = 'MoLang.SmallerOrEqualsNode'
	constructor() {
		super('<=')
	}

	eval() {
		const { val1, val2 } = this.evalHelper()

		return {
			value: Number(Boolean(val1 <= val2)),
		}
	}
}

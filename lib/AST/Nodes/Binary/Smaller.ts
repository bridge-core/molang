import { BinaryNode } from '../../ASTNode'

export class SmallerNode extends BinaryNode {
	type = 'MoLang.SmallerNode'
	constructor() {
		super('<')
	}

	eval() {
		const { val1, val2 } = this.evalHelper()

		return {
			value: Number(Boolean(val1 < val2)),
		}
	}
}

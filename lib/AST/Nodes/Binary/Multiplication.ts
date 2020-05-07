import { BinaryNode } from '../../ASTNode'

export class MultiplicationNode extends BinaryNode {
	type = 'MoLang.MultiplicationNode'
	constructor() {
		super('*')
	}

	eval() {
		const { val1, val2 } = this.evalHelper()

		return {
			value: val1 * val2,
		}
	}
}

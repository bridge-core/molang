import { BinaryNode } from '../../ASTNode'

export class IfNode extends BinaryNode {
	type = 'MoLang.IfNode'
	constructor() {
		super('?')
	}

	eval() {
		const { val1, val2 } = this.evalHelper()

		return {
			value: val1 ? val2 : 0,
		}
	}
}

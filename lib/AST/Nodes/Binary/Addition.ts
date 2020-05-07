import { BinaryNode } from '../../ASTNode'

export class AdditionNode extends BinaryNode {
	type = 'MoLang.AdditionNode'
	constructor() {
		super('+')
	}

	eval() {
		const { val1, val2 } = this.evalHelper()

		return {
			value: val1 + val2,
		}
	}
}

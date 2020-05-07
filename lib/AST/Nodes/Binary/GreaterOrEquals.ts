import { BinaryNode } from '../../ASTNode'

export class GreaterOrEqualsNode extends BinaryNode {
	type = 'MoLang.GreaterOrEqualsNode'
	constructor() {
		super('>=')
	}

	eval() {
		const { val1, val2 } = this.evalHelper()

		return {
			value: Number(Boolean(val1 >= val2)),
		}
	}
}

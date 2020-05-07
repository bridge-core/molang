import { BinaryNode } from '../../ASTNode'

export class ConjunctionNode extends BinaryNode {
	type = 'MoLang.ConjunctionNode'
	constructor() {
		super('&&')
	}

	eval() {
		const { val1, val2 } = this.evalHelper()

		return {
			value: Number(Boolean(val1 && val2)),
		}
	}
}

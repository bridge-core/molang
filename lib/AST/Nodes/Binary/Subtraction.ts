import { BinaryNode } from '../../ASTNode'

export class SubtractionNode extends BinaryNode {
	type = 'MoLang.SubtractionNode'
	constructor() {
		super('-')
	}

	eval() {
		const { val1, val2 } = this.evalHelper()

		return {
			value: val1 - val2,
		}
	}
}

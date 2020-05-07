import { UnaryNode } from '../../ASTNode'

export class MakeNegativeNode extends UnaryNode {
	type = 'MoLang.MakeNegativeNode'

	constructor() {
		super('-')
	}

	eval() {
		const { isReturn, value } = this.children[0].eval()
		if (typeof value === 'string')
			throw new Error(
				`Cannot use '-' operator on string: "-${this.children[0].toString()}"`
			)

		return {
			isReturn,
			value: -value,
		}
	}
}

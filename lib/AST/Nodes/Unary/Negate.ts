import { UnaryNode } from '../../ASTNode'

export class NegationNode extends UnaryNode {
	type = 'MoLang.NegationNode'

	constructor() {
		super('!')
	}

	eval() {
		const { isReturn, value } = this.children[0].eval()
		if (typeof value === 'string')
			throw new Error(
				`Cannot negate string: "!${this.children[0].toString()}"`
			)

		return {
			isReturn,
			value: value > 0 ? 0 : 1,
		}
	}
}

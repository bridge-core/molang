import { UnaryNode, testUnaryHelper } from '../../ASTNode'

export class NegationNode extends UnaryNode {
	type = 'MoLang.NegationNode'

	constructor(expression: string) {
		super('!', expression)
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

export function testNegation(expression: string) {
	if (testUnaryHelper(expression, '!')) return new NegationNode(expression)
}

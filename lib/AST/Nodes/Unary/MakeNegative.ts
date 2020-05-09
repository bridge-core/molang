import { UnaryNode, testUnaryHelper, TEvalResult } from '../../ASTNode'

export class MakeNegativeNode extends UnaryNode {
	type = 'MoLang.MakeNegativeNode'

	constructor(expression: string) {
		super('-', expression)
	}

	eval() {
		const [isReturn, value] = this.children[0].eval()
		if (typeof value === 'string')
			throw new Error(
				`Cannot use '-' operator on string: "-${this.children[0].toString()}"`
			)

		return <TEvalResult>[isReturn, -value]
	}
}

export function testMakeNegative(expression: string) {
	if (testUnaryHelper(expression, '-'))
		return new MakeNegativeNode(expression)
}

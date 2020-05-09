import { UnaryNode, testUnaryHelper, TEvalResult } from '../../ASTNode'

export class ReturnNode extends UnaryNode {
	type = 'MoLang.ReturnNode'

	constructor(expression: string) {
		super('return ', expression)
	}

	eval(): TEvalResult {
		return [true, this.children[0].eval()[1]]
	}
}
export function testReturn(expression: string) {
	if (testUnaryHelper(expression, 'return')) return new ReturnNode(expression)
}

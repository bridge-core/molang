import { UnaryNode, testUnaryHelper } from '../../ASTNode'

export class ReturnNode extends UnaryNode {
	type = 'MoLang.ReturnNode'

	constructor(expression: string) {
		super('return ', expression)
	}

	eval() {
		const { value } = this.children[0].eval()

		return {
			isReturn: true,
			value,
		}
	}
}
export function testReturn(expression: string) {
	if (testUnaryHelper(expression, 'return')) return new ReturnNode(expression)
}

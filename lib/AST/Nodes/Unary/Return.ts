import { UnaryNode } from '../../ASTNode'

export class ReturnNode extends UnaryNode {
	type = 'MoLang.ReturnNode'

	constructor() {
		super('return ')
	}

	eval() {
		const { value } = this.children[0].eval()

		return {
			isReturn: true,
			value,
		}
	}
}

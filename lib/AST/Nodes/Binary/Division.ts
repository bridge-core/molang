import { BinaryNode } from '../../ASTNode'

export class DivisionNode extends BinaryNode {
	type = 'MoLang.DivisionNode'
	constructor() {
		super('/')
	}
}

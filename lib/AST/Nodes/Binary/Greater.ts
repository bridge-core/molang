import { BinaryNode } from '../../ASTNode'

export class GreaterNode extends BinaryNode {
	type = 'MoLang.GreaterNode'
	constructor() {
		super('>')
	}
}

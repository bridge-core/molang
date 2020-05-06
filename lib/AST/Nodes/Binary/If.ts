import { BinaryNode } from '../../ASTNode'

export class IfNode extends BinaryNode {
	type = 'MoLang.IfNode'
	constructor() {
		super('?')
	}
}

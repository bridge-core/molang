import { BinaryNode } from '../../ASTNode'

export class MultiplicationNode extends BinaryNode {
	type = 'MoLang.MultiplicationNode'
	constructor() {
		super('*')
	}
}

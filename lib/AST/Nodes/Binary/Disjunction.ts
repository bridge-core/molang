import { BinaryNode } from '../../ASTNode'

export class DisjunctionNode extends BinaryNode {
	type = 'MoLang.DisjunctionNode'
	constructor() {
		super('||')
	}
}

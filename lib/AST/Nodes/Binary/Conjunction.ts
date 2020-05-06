import { BinaryNode } from '../../ASTNode'

export class ConjunctionNode extends BinaryNode {
	type = 'MoLang.ConjunctionNode'
	constructor() {
		super('&&')
	}
}

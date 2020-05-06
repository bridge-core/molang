import { BinaryNode } from '../../ASTNode'

export class SmallerOrEqualsNode extends BinaryNode {
	type = 'MoLang.SmallerOrEqualsNode'
	constructor() {
		super('<=')
	}
}

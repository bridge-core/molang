import { BinaryNode } from '../../ASTNode'

export class EqualsNode extends BinaryNode {
	type = 'MoLang.EqualsNode'
	constructor() {
		super('==')
	}
}

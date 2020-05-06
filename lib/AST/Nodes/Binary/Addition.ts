import { BinaryNode } from '../../ASTNode'

export class AdditionNode extends BinaryNode {
	type = 'MoLang.AdditionNode'
	constructor() {
		super('+')
	}
}

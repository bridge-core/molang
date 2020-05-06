import { BinaryNode } from '../../ASTNode'

export class GreaterOrEqualsNode extends BinaryNode {
	type = 'MoLang.GreaterOrEqualsNode'
	constructor() {
		super('>=')
	}
}

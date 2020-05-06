import { BinaryNode } from '../../ASTNode'

export class NotEqualsNode extends BinaryNode {
	type = 'MoLang.NotEqualsNode'
	constructor() {
		super('!=')
	}
}

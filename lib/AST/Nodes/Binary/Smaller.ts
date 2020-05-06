import { BinaryNode } from '../../ASTNode'

export class SmallerNode extends BinaryNode {
	type = 'MoLang.SmallerNode'
	constructor() {
		super('<')
	}
}

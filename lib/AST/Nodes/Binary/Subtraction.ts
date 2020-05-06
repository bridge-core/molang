import { BinaryNode } from '../../ASTNode'

export class SubtractionNode extends BinaryNode {
	type = 'MoLang.SubtractionNode'
	constructor() {
		super('-')
	}
}

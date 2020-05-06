import { UnaryNode } from '../../ASTNode'

export class NegationNode extends UnaryNode {
	type = 'MoLang.NegationNode'

	constructor() {
		super('!')
	}
}

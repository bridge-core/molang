import { ChainNode } from '../../ASTNode'

export class IfElseNode extends ChainNode {
	type = 'MoLang.IfElseNode'
	constructor() {
		super('?:')
	}

	eval() {
		if (this.children[0].eval().value) {
			return this.children[1].eval()
		} else {
			return this.children[2].eval()
		}
	}
}

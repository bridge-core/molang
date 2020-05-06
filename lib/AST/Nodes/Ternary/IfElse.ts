import { ChainNode } from '../../ASTNode'

export class IfElseNode extends ChainNode {
	type = 'MoLang.IfElseNode'
	constructor() {
		super('?:')
	}
}

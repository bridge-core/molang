import { ASTNode } from '../../ASTNode'

export class UndefinedNode extends ASTNode {
	type = 'MoLang.UndefinedNode'
	constructor(protected expression: string) {
		super()
	}

	toString() {
		return this.expression
	}
}

export function testUndefined(expression: string) {
	return new UndefinedNode(expression)
}

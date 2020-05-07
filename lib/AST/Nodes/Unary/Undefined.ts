import { ASTNode } from '../../ASTNode'

export class UndefinedNode extends ASTNode {
	type = 'MoLang.UndefinedNode'
	protected expression = ''

	createChildren(expression: string) {
		this.expression = expression
		return this
	}

	toString() {
		return this.expression
	}
	test(_: string) {
		return { isCorrectToken: true }
	}
}

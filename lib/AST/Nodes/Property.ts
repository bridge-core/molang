import { ASTNode } from '../ASTNode'

export class PropertyNode extends ASTNode {
	type = 'MoLang.PropertyNode'
	protected expression = ''

	createChildren(expression: string) {
		this.expression = expression
		return this
	}

	toString() {
		return this.expression
	}

	test(expression: string) {
		return {
			isCorrectToken: /(([aA-zZ]([aA-zZ]|[0-9]|)*)\.?)+/y.test(
				expression
			),
		}
	}
}

import { ASTNode } from '../../ASTNode'

export class NumberNode extends ASTNode {
	type = 'MoLang.NumberNode'
	protected number = 0

	createChildren(_: string) {
		return this
	}
	toString() {
		return String(this.number)
	}
	test(expression: string) {
		this.number = Number(expression)
		return {
			isCorrectToken: !Number.isNaN(this.number),
		}
	}
}

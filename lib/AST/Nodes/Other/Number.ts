import { ASTNode } from '../../ASTNode'

export class NumberNode extends ASTNode {
	type = 'MoLang.NumberNode'
	protected number = 0
	constructor(number: number) {
		super()
		if (number) this.number = number
	}

	toString() {
		return String(this.number)
	}
	eval() {
		return {
			value: this.number,
		}
	}
}

export function testNumber(expression: string) {
	const number = Number(expression)
	if (expression !== '' && !Number.isNaN(number))
		return new NumberNode(number)
}

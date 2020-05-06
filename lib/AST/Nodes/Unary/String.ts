import { GroupNode } from './Group'

export class StringNode extends GroupNode {
	type = 'MoLang.StringNode'
	protected expression = ''
	constructor() {
		super("''")
	}

	createChildren(expression: string) {
		this.expression = expression.substring(1, expression.length - 1)
		return this
	}

	toString() {
		return `'${this.expression}'`
	}
}

import { GroupNode, testGroupHelper } from './Group'
import { TEvalResult } from '../../ASTNode'

export class StringNode extends GroupNode {
	type = 'MoLang.StringNode'
	protected expression = ''
	constructor(expression: string) {
		super("''", expression, false)
		this.expression = expression.substring(1, expression.length - 1)
	}

	eval(): TEvalResult {
		return [false, this.expression]
	}
	toString() {
		return `'${this.expression}'`
	}
}

export function testString(expression: string) {
	if (testGroupHelper(expression, "''")) return new StringNode(expression)
}

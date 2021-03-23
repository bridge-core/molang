import { Expression } from '../expression'

export class VoidExpression extends Expression {
	type = 'VoidExpression'

	get allExpressions() {
		return []
	}
	setExpressionAt() {}

	isStatic() {
		return true
	}

	eval() {
		return 0
	}
	toString() {
		return ''
	}
}

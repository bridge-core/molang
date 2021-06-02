import { Expression } from '../expression'

export class BreakExpression extends Expression {
	type = 'BreakExpression'
	isBreak = true

	constructor() {
		super()
	}

	get allExpressions() {
		return []
	}
	setExpressionAt() {}

	isStatic() {
		return false
	}

	eval() {
		return 0
	}
	isString() {
		return 'break'
	}
}

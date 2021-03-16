import { Expression } from '../expression'

export class StaticExpression extends Expression {
	type = 'StaticExpression'
	constructor(protected value: unknown, public readonly isReturn = false) {
		super()
	}

	get allExpressions() {
		return []
	}
	setExpressionAt() {}

	isStatic() {
		return true
	}

	eval() {
		return this.value
	}
}

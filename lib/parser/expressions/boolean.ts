import { Expression } from '../expression'

export class BooleanExpression extends Expression {
	type = 'BooleanExpression'
	constructor(protected value: boolean) {
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

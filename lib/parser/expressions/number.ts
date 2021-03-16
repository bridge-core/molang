import { Expression, IExpression } from '../expression'

export class NumberExpression extends Expression {
	type = 'NumberExpression'

	constructor(protected value: number) {
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

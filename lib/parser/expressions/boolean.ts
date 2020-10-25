import { Expression, IExpression } from '../expression'

export class BooleanExpression extends Expression {
	type = 'BooleanExpression'
	constructor(protected value: boolean) {
		super()
	}

	isStatic() {
		return true
	}

	eval() {
		return this.value
	}
}

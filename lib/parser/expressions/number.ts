import { Expression, IExpression } from '../expression'

export class NumberExpression extends Expression {
	type = 'NumberExpression'

	constructor(protected value: number) {
		super()
	}

	isStatic() {
		return true
	}

	eval() {
		return this.value
	}
}

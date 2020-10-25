import { Expression } from '../expression'

export class StaticExpression extends Expression {
	type = 'StaticExpression'
	constructor(protected value: unknown, public readonly isReturn = false) {
		super()
	}

	isStatic() {
		return true
	}

	eval() {
		return this.value
	}
}

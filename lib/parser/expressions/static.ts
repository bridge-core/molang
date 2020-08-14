import { IExpression } from '../expression'

export class StaticExpression implements IExpression {
	constructor(protected value: unknown, public readonly isReturn = false) {}

	isStatic() {
		return true
	}

	eval() {
		return this.value
	}
}

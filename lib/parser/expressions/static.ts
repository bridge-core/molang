import { IExpression } from '../expression'

export class StaticExpression implements IExpression {
	constructor(protected value: unknown) {}

	isStatic() {
		return true
	}

	eval() {
		return this.value
	}
}

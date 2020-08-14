import { IExpression } from '../expression'

export class NumberExpression implements IExpression {
	constructor(protected value: number) {}

	isStatic() {
		return true
	}

	eval() {
		return this.value
	}
}

import { IExpression } from '../expression'

export class BooleanExpression implements IExpression {
	constructor(protected value: boolean) {}

	isStatic() {
		return true
	}

	eval() {
		return this.value
	}
}

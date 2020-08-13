import { IExpression } from '../expression'

export class NumberExpression implements IExpression {
	constructor(protected value: number) {}

	eval() {
		return this.value
	}
}

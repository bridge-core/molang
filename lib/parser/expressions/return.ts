import { IExpression } from '../expression'

export class ReturnExpression {
	isReturn = true

	constructor(protected expression: IExpression) {}

	isStatic() {
		return false
	}

	eval() {
		return this.expression.eval()
	}
}

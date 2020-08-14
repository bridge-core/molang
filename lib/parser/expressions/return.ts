import { IExpression } from '../expression'

export class ReturnExpression {
	isReturn = true

	constructor(protected expression: IExpression) {}

	isStatic() {
		return this.expression.isStatic()
	}

	eval() {
		return this.expression.eval()
	}
}

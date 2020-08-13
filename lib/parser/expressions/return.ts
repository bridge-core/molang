import { IExpression } from '../expression'

export class ReturnExpression {
	constructor(protected expression: IExpression) {}

	isStatic() {
		return this.expression.isStatic()
	}

	eval() {
		return this.expression.eval()
	}
}

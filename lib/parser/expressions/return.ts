import { IExpression } from '../expression'

export class ReturnExpression {
	constructor(protected expression: IExpression) {}

	eval() {
		return this.expression.eval()
	}
}

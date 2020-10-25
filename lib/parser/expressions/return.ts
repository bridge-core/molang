import { Expression, IExpression } from '../expression'

export class ReturnExpression extends Expression {
	type = 'ReturnExpression'
	isReturn = true

	constructor(protected expression: IExpression) {
		super()
	}

	isStatic() {
		return false
	}

	eval() {
		return this.expression.eval()
	}
}

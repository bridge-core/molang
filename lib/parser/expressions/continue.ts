import { Expression, IExpression } from '../expression'

export class ContinueExpression extends Expression {
	type = 'ContinueExpression'
	isContinue = true

	constructor() {
		super()
	}

	isStatic() {
		return false
	}

	eval() {
		return 0
	}
}

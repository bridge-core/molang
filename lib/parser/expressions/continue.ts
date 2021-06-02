import { Expression } from '../expression'

export class ContinueExpression extends Expression {
	type = 'ContinueExpression'
	isContinue = true

	constructor() {
		super()
	}

	get allExpressions() {
		return []
	}
	setExpressionAt() {}

	isStatic() {
		return false
	}

	eval() {
		return 0
	}
	toString() {
		return 'continue'
	}
}

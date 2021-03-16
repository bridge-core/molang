import { Expression, IExpression } from '../expression'

export class BreakExpression extends Expression {
	type = 'BreakExpression'
	isBreak = true

	constructor() {
		super()
	}

	isStatic() {
		return false
	}

	eval() {
		return 0
	}
	isString() {
		return 'break'
	}
}

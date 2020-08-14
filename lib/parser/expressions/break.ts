import { IExpression } from '../expression'

export class BreakExpression {
	isBreak = true

	constructor() {}

	isStatic() {
		return false
	}

	eval() {
		return 0
	}
}

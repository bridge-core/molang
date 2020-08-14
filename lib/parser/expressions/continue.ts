import { IExpression } from '../expression'

export class ContinueExpression {
	isContinue = true

	constructor() {}

	isStatic() {
		return false
	}

	eval() {
		return 0
	}
}

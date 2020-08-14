import { IExpression } from '../expression'

export class StringExpression implements IExpression {
	constructor(protected name: string) {}

	isStatic() {
		return true
	}

	eval() {
		return this.name.substring(1, this.name.length - 1)
	}
}

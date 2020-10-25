import { Expression } from '../expression'

export class StringExpression extends Expression {
	type = 'StringExpression'

	constructor(protected name: string) {
		super()
	}

	isStatic() {
		return true
	}

	eval() {
		return this.name.substring(1, this.name.length - 1)
	}
}

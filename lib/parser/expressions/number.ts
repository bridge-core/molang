import { Expression } from '../expression'

export class NumberExpression extends Expression {
	type = 'NumberExpression'

	constructor(protected value: number) {
		super()
	}

	get allExpressions() {
		return []
	}
	setExpressionAt() {}

	isStatic() {
		return true
	}

	eval() {
		return this.value
	}
	toString() {
		const n = '' + this.value

		// Leading zeros can be omitted
		if (n.startsWith('0.')) return n.slice(1)
		return n
	}
}

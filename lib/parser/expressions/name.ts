import { Expression } from '../expression'
import { Parser } from '../parse'

export class NameExpression extends Expression {
	type = 'NameExpression'

	constructor(
		protected parser: Parser,
		protected name: string,
		protected isFunctionCall = false
	) {
		super()
	}

	get allExpressions() {
		return []
	}
	setExpressionAt() {}

	isStatic() {
		return false
	}

	setPointer(value: unknown) {
		this.parser.executionEnv.setAt(this.name, value)
	}

	setFunctionCall(value = true) {
		this.isFunctionCall = value
	}
	setName(name: string) {
		this.name = name
	}

	eval() {
		const value = this.parser.executionEnv.getFrom(this.name)
		if (!this.isFunctionCall && typeof value === 'function') return value()
		return value
	}

	toString() {
		return this.name
	}
}

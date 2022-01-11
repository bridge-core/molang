import { ExecutionEnvironment } from '../../env/env'
import { Expression } from '../expression'

export class NameExpression extends Expression {
	type = 'NameExpression'

	constructor(
		public executionEnv: ExecutionEnvironment,
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
		this.executionEnv.setAt(this.name, value)
	}

	setFunctionCall(value = true) {
		this.isFunctionCall = value
	}
	setName(name: string) {
		this.name = name
	}
	setExecutionEnv(executionEnv: ExecutionEnvironment) {
		this.executionEnv = executionEnv
	}

	eval() {
		const value = this.executionEnv.getFrom(this.name)
		if (!this.isFunctionCall && typeof value === 'function') return value()
		return value
	}

	toString() {
		return this.name
	}
}

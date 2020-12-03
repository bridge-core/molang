import { Expression } from '../expression'
import { ExecutionEnvironment } from '../../env'

export class NameExpression extends Expression {
	type = 'NameExpression'

	constructor(
		protected env: ExecutionEnvironment,
		protected name: string,
		protected isFunctionCall = false
	) {
		super()
	}

	isStatic() {
		return false
	}

	setPointer(value: unknown) {
		this.env.setAt(this.name, value)
	}

	setFunctionCall(value = true) {
		this.isFunctionCall = value
	}

	eval() {
		const value = this.env.getFrom(this.name)
		if (!this.isFunctionCall && typeof value === 'function') return value()
		return value
	}
}

import { Expression } from '../expression'
import { getFromEnv, setEnvAt } from '../../env'

export class NameExpression extends Expression {
	type = 'NameExpression'

	constructor(protected name: string, protected isFunctionCall = false) {
		super()
	}

	isStatic() {
		return false
	}

	setPointer(value: unknown) {
		setEnvAt(this.name, value)
	}

	setFunctionCall(value = true) {
		this.isFunctionCall = value
	}

	eval() {
		const value = getFromEnv(this.name)
		if (!this.isFunctionCall && typeof value === 'function') return value()
		return value
	}
}

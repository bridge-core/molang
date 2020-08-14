import { IExpression } from '../expression'
import { getFromEnv, setEnvAt } from '../../env'

export class NameExpression implements IExpression {
	constructor(protected name: string, protected isFunctionCall = false) {}

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

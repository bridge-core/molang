import { IExpression } from '../expression'
import { getFromEnv } from '../../env'

export class NameExpression implements IExpression {
	constructor(protected name: string, protected isFunctionCall = false) {}

	isStatic() {
		return false
	}

	getName() {
		return this.name
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

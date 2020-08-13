import { IExpression } from '../expression'
import { getFromEnv } from '../../env'

export class NameExpression implements IExpression {
	constructor(protected name: string) {}

	isStatic() {
		return true
	}

	getName() {
		return this.name
	}

	eval() {
		return getFromEnv(this.name)
	}
}

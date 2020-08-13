import { IExpression } from '../expression'
import { getFromEnv } from '../../env'

export class NameExpression implements IExpression {
	constructor(protected name: string) {}

	isStatic() {
		return true
	}

	eval() {
		return getFromEnv(this.name) || this.name
	}
}

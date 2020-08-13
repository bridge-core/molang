import { IExpression } from '../expression'

export class StringExpression implements IExpression {
	constructor(protected name: string) {}

	eval() {
		return this.name.substring(1, this.name.length - 1)
	}
}

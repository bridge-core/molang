import { IExpression } from '../expression'
import { NameExpression } from './name'

export class ArrayAccessExpression implements IExpression {
	constructor(protected name: IExpression, protected lookup: IExpression) {}

	isStatic() {
		return false
	}

	getName() {
		if (!(this.name instanceof NameExpression))
			throw new Error(
				`Expected NameExpression, found ${this.name.eval()}`
			)
		return `${this.name.getName()}.${this.lookup.eval()}`
	}

	eval() {
		return (<any>this.name.eval())[<number>this.lookup.eval()]
	}
}

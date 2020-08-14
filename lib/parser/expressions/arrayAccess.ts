import { IExpression } from '../expression'
import { NameExpression } from './name'

export class ArrayAccessExpression implements IExpression {
	constructor(protected name: IExpression, protected lookup: IExpression) {}

	isStatic() {
		return false
	}

	setPointer(value: unknown) {
		;(<any>this.name.eval())[<number>this.lookup.eval()] = value
	}

	eval() {
		return (<any>this.name.eval())[<number>this.lookup.eval()]
	}
}

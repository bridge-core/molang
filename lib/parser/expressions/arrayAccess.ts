import { Expression, IExpression } from '../expression'
import { NameExpression } from './name'

export class ArrayAccessExpression extends Expression {
	type = 'ArrayAccessExpression'
	constructor(protected name: IExpression, protected lookup: IExpression) {
		super()
	}

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

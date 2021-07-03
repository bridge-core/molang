import { Expression, IExpression } from '../expression'

export class ArrayAccessExpression extends Expression {
	type = 'ArrayAccessExpression'
	constructor(protected name: IExpression, protected lookup: IExpression) {
		super()
	}

	get allExpressions() {
		return [this.name, this.lookup]
	}
	setExpressionAt(index: number, expr: IExpression) {
		if (index === 0) this.name = expr
		else if (index === 1) this.lookup = expr
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

	toString() {
		return `${this.name.toString()}[${this.lookup.toString()}]`
	}
}

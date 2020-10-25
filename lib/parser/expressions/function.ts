import { Expression, IExpression } from '../expression'

export class FunctionExpression extends Expression {
	type = 'FunctionExpression'

	constructor(protected name: IExpression, protected args: IExpression[]) {
		super()
	}

	isStatic() {
		return false
	}

	eval() {
		const args: unknown[] = []
		let i = 0
		while (i < this.args.length) args.push(this.args[i++].eval())

		return (<(...args: unknown[]) => unknown>this.name.eval())(...args)
	}
}

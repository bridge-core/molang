import { IExpression } from '../expression'

export class FunctionExpression implements IExpression {
	constructor(protected name: IExpression, protected args: IExpression[]) {}

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

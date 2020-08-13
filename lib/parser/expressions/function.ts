import { IExpression } from '../expression'

export class FunctionExpression implements IExpression {
	constructor(protected name: IExpression, protected args: IExpression[]) {}

	isStatic() {
		return false
	}

	eval() {
		console.log(this.name.eval())
		return (<(...args: unknown[]) => unknown>this.name.eval())(
			...this.args.map((arg) => arg.eval())
		)
	}
}

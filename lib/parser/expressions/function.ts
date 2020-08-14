import { IExpression } from '../expression'

export class FunctionExpression implements IExpression {
	constructor(protected name: IExpression, protected args: IExpression[]) {}

	isStatic() {
		return false
	}

	eval() {
		return (<(...args: unknown[]) => unknown>this.name.eval())(
			...this.args.map((arg) => arg.eval())
		)
	}
}

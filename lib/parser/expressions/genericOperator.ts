import { IExpression } from '../expression'

export class GenericOperatorExpression implements IExpression {
	constructor(
		protected left: IExpression,
		protected right: IExpression,
		protected evalHelper: () => unknown
	) {}

	isStatic() {
		return this.left.isStatic() && this.right.isStatic()
	}

	eval() {
		return this.evalHelper()
	}
}

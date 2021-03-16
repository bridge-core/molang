import { Expression, IExpression } from '../expression'

export class GenericOperatorExpression extends Expression {
	type = 'GenericOperatorExpression'

	constructor(
		protected left: IExpression,
		protected right: IExpression,
		protected operator: string,
		protected evalHelper: () => unknown
	) {
		super()
	}

	isStatic() {
		return this.left.isStatic() && this.right.isStatic()
	}

	eval() {
		return this.evalHelper()
	}

	toString() {
		return `${this.left.toString()}${this.operator}${this.right.toString()}`
	}
}

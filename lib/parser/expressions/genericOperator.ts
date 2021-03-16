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

	get allExpressions() {
		return [this.left, this.right]
	}
	setExpressionAt(index: number, expr: IExpression) {
		if (index === 0) this.left = expr
		else if (index === 1) this.right = expr
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

import { IExpression } from '../expression'

export class TernaryExpression implements IExpression {
	protected leftResult: unknown

	constructor(
		protected leftExpression: IExpression,
		protected thenExpression: IExpression,
		protected elseExpression: IExpression
	) {}

	get isReturn() {
		return this.leftResult
			? this.thenExpression.isReturn
			: this.elseExpression.isReturn
	}

	isStatic() {
		return (
			this.leftExpression.isStatic() &&
			this.thenExpression.isStatic() &&
			this.elseExpression.isStatic()
		)
	}

	eval() {
		this.leftResult = this.leftExpression.eval()
		return this.leftResult
			? this.thenExpression.eval()
			: this.elseExpression.eval()
	}
}

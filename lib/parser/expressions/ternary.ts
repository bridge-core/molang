import { IExpression } from '../expression'

export class TernaryExpression implements IExpression {
	constructor(
		protected leftExpression: IExpression,
		protected thenExpression: IExpression,
		protected elseExpression: IExpression
	) {}

	isStatic() {
		return (
			this.leftExpression.isStatic() &&
			this.thenExpression.isStatic() &&
			this.elseExpression.isStatic()
		)
	}

	eval() {
		return this.leftExpression.eval()
			? this.thenExpression.eval()
			: this.elseExpression.eval()
	}
}

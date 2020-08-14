import { IExpression } from '../expression'

export class TernaryExpression implements IExpression {
	constructor(
		protected leftExpression: IExpression,
		protected thenExpression: IExpression,
		protected elseExpression: IExpression
	) {}

	get isReturn() {
		return this.thenExpression.isReturn || this.elseExpression.isReturn
	}

	isStatic() {
		return (
			this.leftExpression.isStatic() &&
			this.thenExpression.isStatic() &&
			this.elseExpression.isStatic()
		)
	}

	eval() {
		console.log(
			this.leftExpression.eval(),
			this.thenExpression,
			this.thenExpression.eval()
		)
		return this.leftExpression.eval()
			? this.thenExpression.eval()
			: this.elseExpression.eval()
	}
}

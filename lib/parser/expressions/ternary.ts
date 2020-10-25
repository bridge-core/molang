import { Expression, IExpression } from '../expression'

export class TernaryExpression extends Expression {
	type = 'TernaryExpression'
	protected leftResult: unknown

	constructor(
		protected leftExpression: IExpression,
		protected thenExpression: IExpression,
		protected elseExpression: IExpression
	) {
		super()
	}

	get isReturn() {
		return this.leftResult
			? this.thenExpression.isReturn
			: this.elseExpression.isReturn
	}
	get isContinue() {
		return this.leftResult
			? this.thenExpression.isContinue
			: this.elseExpression.isContinue
	}
	get isBreak() {
		return this.leftResult
			? this.thenExpression.isBreak
			: this.elseExpression.isBreak
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

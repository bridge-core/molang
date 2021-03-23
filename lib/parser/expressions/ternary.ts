import { Expression, IExpression } from '../expression'
import { VoidExpression } from './void'

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

	get allExpressions() {
		if (this.leftExpression.isStatic())
			return [
				this.leftExpression,
				this.leftExpression.eval()
					? this.thenExpression
					: this.elseExpression,
			]
		return [this.leftExpression, this.thenExpression, this.elseExpression]
	}
	setExpressionAt(index: number, expr: IExpression) {
		if (index === 0) this.leftExpression = expr
		else if (index === 1) this.thenExpression = expr
		else if (index === 2) this.elseExpression = expr
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

	toString() {
		if (this.elseExpression instanceof VoidExpression)
			return `${this.leftExpression.toString()}?${this.thenExpression.toString()}`
		return `${this.leftExpression.toString()}?${this.thenExpression.toString()}:${this.elseExpression.toString()}`
	}
}

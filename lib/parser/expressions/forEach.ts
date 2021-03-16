import { Expression, IExpression } from '../expression'
import { NameExpression } from './name'
import { ArrayAccessExpression } from './arrayAccess'

export class ForEachExpression extends Expression {
	type = 'ForEachExpression'

	constructor(
		protected variable: IExpression,
		protected arrayExpression: IExpression,
		protected expression: IExpression
	) {
		super()
		if (!this.variable.setPointer)
			throw new Error(
				`First for_each() argument must be a variable, received "${typeof this.variable.eval()}"`
			)
	}

	get isReturn() {
		return this.expression.isReturn
	}
	get allExpressions() {
		return [this.variable, this.arrayExpression, this.expression]
	}
	setExpressionAt(index: number, expr: IExpression) {
		if (index === 0) this.variable = expr
		else if (index === 1) this.arrayExpression = expr
		else if (index === 2) this.expression = expr
	}

	isStatic() {
		return (
			this.variable.isStatic() &&
			this.arrayExpression.isStatic() &&
			this.expression.isStatic()
		)
	}

	eval() {
		const array = this.arrayExpression.eval()
		if (!Array.isArray(array))
			throw new Error(
				`Second for_each() argument must be an array, received "${typeof array}"`
			)

		let i = 0
		while (i < array.length) {
			// Error detection for this.variable is part of the constructor
			this.variable.setPointer?.(array[i++])

			const res = this.expression.eval()

			if (this.expression.isBreak) break
			else if (this.expression.isContinue) continue
			else if (this.expression.isReturn) return res
		}

		return 0
	}

	toString() {
		return `loop(${this.variable.toString()},${this.arrayExpression.toString()},${this.expression.toString()})`
	}
}

import { IExpression } from '../expression'

export class ForEachExpression implements IExpression {
	constructor(
		protected variable: IExpression,
		protected arrayExpression: IExpression,
		protected expression: IExpression
	) {}

	get isReturn() {
		return this.expression.isReturn
	}

	isStatic() {
		return false
	}

	eval() {
		if (!this.variable.setPointer)
			throw new Error(
				`First for_each() argument must be a variable, received "${typeof this.variable.eval()}"`
			)
		const array = this.arrayExpression.eval()
		if (!Array.isArray(array))
			throw new Error(
				`Second for_each() argument must be an array, received "${typeof array}"`
			)

		let i = 0
		while (i < array.length) {
			this.variable.setPointer(array[i++])

			const res = this.expression.eval()

			if (this.expression.isBreak) break
			else if (this.expression.isContinue) continue
			else if (this.expression.isReturn) return res
		}

		return 0
	}
}

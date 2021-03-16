import { Expression, IExpression } from '../expression'

export class LoopExpression extends Expression {
	type = 'LoopExpression'

	constructor(
		protected count: IExpression,
		protected expression: IExpression
	) {
		super()
	}

	get allExpressions() {
		return [this.count, this.expression]
	}
	setExpressionAt(index: number, expr: IExpression) {
		if (index === 0) this.count = expr
		else if (index === 1) this.expression = expr
	}

	get isReturn() {
		return this.expression.isReturn
	}

	isStatic() {
		return this.count.isStatic() && this.expression.isStatic()
	}

	eval() {
		const repeatCount = Number(this.count.eval())
		if (Number.isNaN(repeatCount))
			throw new Error(
				`First loop() argument must be of type number, received "${typeof this.count.eval()}"`
			)
		if (repeatCount > 1024)
			throw new Error(
				`Cannot loop more than 1024x times, received "${repeatCount}"`
			)

		let i = 0
		while (i < repeatCount) {
			i++
			const res = this.expression.eval()

			if (this.expression.isBreak) break
			else if (this.expression.isContinue) continue
			else if (this.expression.isReturn) return res
		}

		return 0
	}

	toString() {
		return `loop(${this.count.toString()},${this.expression.toString()})`
	}
}

import { Expression, IExpression } from '../expression'
import { StaticExpression } from './static'
import { VoidExpression } from './void'

export class StatementExpression extends Expression {
	type = 'StatementExpression'
	protected didReturn?: boolean = undefined
	protected wasLoopBroken = false
	protected wasLoopContinued = false

	constructor(protected expressions: IExpression[]) {
		super()
	}

	get allExpressions() {
		return this.expressions
	}
	setExpressionAt(index: number, expr: IExpression) {
		this.expressions[index] = expr
	}

	get isReturn() {
		if (this.didReturn !== undefined) return this.didReturn

		// This breaks scope vs. statement parsing for some reason
		let i = 0
		while (i < this.expressions.length) {
			const expr = this.expressions[i]

			if (expr.isBreak) return false
			if (expr.isContinue) return false
			if (expr.isReturn) {
				this.didReturn = true
				return true
			}
			i++
		}
		this.didReturn = false
		return false
	}

	get isBreak() {
		if (this.wasLoopBroken) {
			this.wasLoopBroken = false
			return true
		}
		return false
	}
	get isContinue() {
		if (this.wasLoopContinued) {
			this.wasLoopContinued = false
			return true
		}
		return false
	}

	isStatic() {
		let i = 0
		while (i < this.expressions.length) {
			if (!this.expressions[i].isStatic()) return false
			i++
		}
		return true
	}

	eval() {
		this.didReturn = false
		this.wasLoopBroken = false
		this.wasLoopContinued = false
		let i = 0
		while (i < this.expressions.length) {
			let res = this.expressions[i].eval()

			if (this.expressions[i].isReturn) {
				this.didReturn = true
				return res
			} else if (this.expressions[i].isContinue) {
				this.wasLoopContinued = true
				return
			} else if (this.expressions[i].isBreak) {
				this.wasLoopBroken = true
				return
			}
			i++
		}
		return 0
	}

	toString() {
		let str = ''
		for (const expr of this.expressions) {
			if (
				expr instanceof VoidExpression ||
				(expr instanceof StaticExpression && !expr.isReturn)
			)
				continue
			str += `${expr.toString()};`
		}

		return str
	}
}

import { Expression, IExpression } from '../expression'

export class ReturnExpression extends Expression {
	type = 'ReturnExpression'
	isReturn = true

	constructor(protected expression: IExpression) {
		super()
	}

	get allExpressions() {
		return [this.expression]
	}
	setExpressionAt(_: number, expr: IExpression) {
		this.expression = expr
	}

	isStatic() {
		return false
	}

	eval() {
		return this.expression.eval()
	}

	toString() {
		return `return ${this.expression.toString()}`
	}
}

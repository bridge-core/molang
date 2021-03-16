import { Expression, IExpression } from '../expression'

export class GroupExpression extends Expression {
	type = 'GroupExpression'

	constructor(protected expression: IExpression, protected brackets: string) {
		super()
	}

	get allExpressions() {
		return [this.expression]
	}
	setExpressionAt(_: number, expr: IExpression) {
		this.expression = expr
	}

	isStatic() {
		return this.expression.isStatic()
	}
	get isReturn() {
		return this.expression.isReturn
	}

	eval() {
		return this.expression.eval()
	}
	toString() {
		return `${this.brackets[0]}${this.expression.toString()}${
			this.brackets[1]
		}`
	}
}

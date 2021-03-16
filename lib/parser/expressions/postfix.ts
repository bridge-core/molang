import { TTokenType } from '../../tokenizer/token'
import { Expression, IExpression } from '../expression'

export class PostfixExpression extends Expression {
	type = 'PostfixExpression'

	constructor(
		protected expression: IExpression,
		protected tokenType: TTokenType
	) {
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

	eval() {
		switch (this.tokenType) {
			case 'X': {
				// DO SOMETHING
			}
		}
	}
}

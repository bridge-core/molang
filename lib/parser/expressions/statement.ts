import { TTokenType } from '../../tokenizer/token'
import { IExpression } from '../expression'
import { ReturnExpression } from './return'

export class StatementExpression {
	constructor(
		protected expression: IExpression,
		protected nextExpression: IExpression
	) {}

	isStatic() {
		return this.expression.isStatic() && this.nextExpression.isStatic()
	}

	eval() {
		let res = this.expression.eval()
		if (this.expression instanceof ReturnExpression) return res
		return this.nextExpression.eval()
	}

	getExpression() {
		return this.expression
	}
}

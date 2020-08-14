import { IExpression } from '../expression'

export class OperatorExpression implements IExpression {
	constructor(
		protected leftExpression: IExpression,
		protected operator: string,
		protected rightExpression: IExpression
	) {}

	isStatic() {
		return this.leftExpression.isStatic() && this.rightExpression.isStatic()
	}

	eval() {
		switch (this.operator) {
			case '=': {
				if (this.leftExpression.setPointer) {
					this.leftExpression.setPointer(this.rightExpression.eval())
					return 0
				} else {
					throw Error(
						`Cannot assign to "${this.leftExpression.eval()}"`
					)
				}
			}
			case '&&':
				return this.leftExpression.eval() && this.rightExpression.eval()
			case '||':
				return this.leftExpression.eval() || this.rightExpression.eval()
			case '<=':
				//@ts-ignore
				return this.leftExpression.eval() <= this.rightExpression.eval()
			case '<':
				//@ts-ignore
				return this.leftExpression.eval() < this.rightExpression.eval()
			case '>=':
				//@ts-ignore
				return this.leftExpression.eval() <= this.rightExpression.eval()
			case '>':
				//@ts-ignore
				return this.leftExpression.eval() < this.rightExpression.eval()
			case '==':
				return this.leftExpression.eval() == this.rightExpression.eval()
			case '!=':
				return this.leftExpression.eval() != this.rightExpression.eval()
			case '??':
				return this.leftExpression.eval() ?? this.rightExpression.eval()
		}
	}
}

import { IExpression } from '../expression'

export class OperatorExpression implements IExpression {
	constructor(
		protected leftExpression: IExpression,
		protected operator: string,
		protected rightExpression: IExpression
	) {}

	eval() {
		switch (this.operator) {
			case '==':
				return this.leftExpression.eval() == this.rightExpression.eval()
			case '!=':
				return this.leftExpression.eval() != this.rightExpression.eval()
		}

		const leftValue = <number | boolean>this.leftExpression.eval()
		const rightValue = <number | boolean>this.rightExpression.eval()

		if (
			!(
				typeof leftValue === 'number' ||
				typeof rightValue === 'number' ||
				typeof leftValue === 'boolean' ||
				typeof rightValue === 'boolean'
			)
		)
			throw new Error(
				`Cannot use numeric operators for expression "${leftValue} ${this.operator} ${rightValue}"`
			)

		switch (this.operator) {
			case '+':
				//@ts-ignore
				return leftValue + rightValue
			case '-':
				//@ts-ignore
				return leftValue - rightValue
			case '*':
				//@ts-ignore
				return leftValue * rightValue
			case '/':
				//@ts-ignore
				return leftValue / rightValue
			case '&&':
				return this.leftExpression.eval() && this.rightExpression.eval()
			case '||':
				return this.leftExpression.eval() || this.rightExpression.eval()
		}
	}
}

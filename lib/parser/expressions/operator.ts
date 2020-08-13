import { IExpression } from '../expression'

export class OperatorExpression implements IExpression {
	constructor(
		protected leftExpression: IExpression,
		protected operator: string,
		protected rightExpression: IExpression
	) {}

	eval() {
		const leftValue = this.leftExpression.eval()
		const rightValue = this.rightExpression.eval()

		if (typeof leftValue !== 'number' || typeof rightValue !== 'number')
			throw new Error(
				`Cannot use numeric operators for expression "${leftValue} ${this.operator} ${rightValue}"`
			)

		switch (this.operator) {
			case '+':
				return leftValue + rightValue
			case '-':
				return leftValue - rightValue
			case '*':
				return leftValue * rightValue
			case '/':
				return leftValue / rightValue
		}
	}
}

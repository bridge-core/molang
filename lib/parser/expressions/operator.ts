import { IExpression } from '../expression'
import { getFromEnv } from '../../env'

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
			case '.': {
				console.log(
					this.leftExpression.eval(),
					this.rightExpression.eval(),
					this.rightExpression
				)
				return (<any>this.leftExpression.eval())[
					<any>this.rightExpression.eval()
				]
			}

			case '==':
				return this.leftExpression.eval() == this.rightExpression.eval()
			case '!=':
				return this.leftExpression.eval() != this.rightExpression.eval()
			case '??':
				return this.leftExpression.eval() ?? this.rightExpression.eval()
		}

		const leftValue = this.leftExpression.eval()
		const rightValue = this.rightExpression.eval()

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
				return leftValue && rightValue
			case '||':
				return leftValue || rightValue
			case '<=':
				//@ts-ignore
				return leftValue <= rightValue
			case '<':
				//@ts-ignore
				return leftValue < rightValue
			case '>=':
				//@ts-ignore
				return leftValue <= rightValue
			case '>':
				//@ts-ignore
				return leftValue < rightValue
		}
	}
}

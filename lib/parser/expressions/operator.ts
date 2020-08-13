import { IExpression } from '../expression'
import { getFromEnv, setEnvAt } from '../../env'
import { NameExpression } from './name'
import { ArrayAccessExpression } from './arrayAccess'

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
				if (
					this.leftExpression instanceof NameExpression ||
					this.leftExpression instanceof ArrayAccessExpression
				) {
					setEnvAt(
						this.leftExpression.getName(),
						this.rightExpression.eval()
					)
					return 0
				} else {
					throw Error(
						`Cannot assign to "${this.leftExpression.eval()}"`
					)
				}
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

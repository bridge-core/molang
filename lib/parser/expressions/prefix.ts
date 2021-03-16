import { TTokenType } from '../../tokenizer/token'
import { Expression, IExpression } from '../expression'

export class PrefixExpression extends Expression {
	type = 'PrefixExpression'

	constructor(
		protected tokenType: TTokenType,
		protected expression: IExpression
	) {
		super()
	}

	isStatic() {
		return this.expression.isStatic()
	}

	eval() {
		const value = this.expression.eval()

		if (typeof value !== 'number')
			throw new Error(
				`Cannot use "${
					this.tokenType
				}" operator in front of ${typeof value} "${value}"`
			)

		switch (this.tokenType) {
			case 'MINUS': {
				return -value
			}
			case 'BANG': {
				return !value
			}
		}
	}
}

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

		switch (this.tokenType) {
			case 'MINUS': {
				if (typeof value !== 'number')
					throw new Error(
						`Cannot use "-" operator in front of ${typeof value}: "-${value}"`
					)
				return -value
			}
			case 'BANG': {
				if (typeof value === 'string')
					throw new Error(
						`Cannot use "!" operator in front of string: "!${value}"`
					)
				return !value
			}
		}
	}
}

import { TTokenType } from '../../tokenizer/token'
import { IExpression } from '../expression'

export class PrefixExpression {
	constructor(
		protected tokenType: TTokenType,
		protected expression: IExpression
	) {}

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
		}
	}
}

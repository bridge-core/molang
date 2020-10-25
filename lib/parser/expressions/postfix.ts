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

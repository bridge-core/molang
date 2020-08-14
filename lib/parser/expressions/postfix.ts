import { TTokenType } from '../../tokenizer/token'
import { IExpression } from '../expression'

export class PostfixExpression {
	constructor(
		protected expression: IExpression,
		protected tokenType: TTokenType
	) {}

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

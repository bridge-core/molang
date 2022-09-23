import { ExecutionEnvironment } from '../../env/env'
import { TTokenType } from '../../tokenizer/token'
import { Expression, IExpression } from '../expression'

export class PostfixExpression extends Expression {
	type = 'PostfixExpression'

	constructor(
		public executionEnv: ExecutionEnvironment,
		protected expression: IExpression,
		protected tokenType: TTokenType
	) {
		super()
	}

	get allExpressions() {
		return [this.expression]
	}
	setExpressionAt(_: number, expr: IExpression) {
		this.expression = expr
	}

	isStatic() {
		return false;
	}

	eval() {
		return this.expression.eval()
	}

	//TODO: Replace this by ast.walk transformation
	toString(): string {
		const expr = this.expression.toString()
		switch (this.tokenType) {
			case 'PLUS': {
				return `(${expr}=${expr}+1;0)+${expr}-1`
			}
			case 'MINUS': {
				return `(${expr}=${expr}-1;0)+${expr}+1`
			}
		}
		throw new Error(`Unknown postfix operator: "${this.tokenType}"`)
	}
}

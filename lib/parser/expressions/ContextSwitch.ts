import { ExecutionEnvironment } from '../../env/env'
import { Expression, IExpression } from '../expression'
import { FunctionExpression } from './function'
import { NameExpression } from './name'

export class ContextSwitchExpression extends Expression {
	type = 'NameExpression'

	constructor(
		protected leftExpr: NameExpression | FunctionExpression,
		protected rightExpr: NameExpression | FunctionExpression
	) {
		super()
	}

	get allExpressions() {
		return [this.leftExpr, this.rightExpr]
	}
	setExpressionAt(index: number, expr: IExpression) {
		if (!(expr instanceof NameExpression))
			throw new Error(
				`Cannot use context switch operator "->" on ${expr.type}`
			)

		if (index === 0) this.leftExpr = expr
		else if (index === 1) this.rightExpr = expr
	}

	isStatic() {
		return false
	}

	eval() {
		const context = this.leftExpr.eval()
		if (typeof context !== 'object') return 0

		this.rightExpr.setExecutionEnv(
			new ExecutionEnvironment(
				context,
				this.rightExpr.executionEnv.config
			)
		)
		return this.rightExpr.eval()
	}

	toString() {
		return `${this.leftExpr.toString()}->${this.rightExpr.toString()}`
	}
}

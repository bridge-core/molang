import { ExecutionEnvironment } from '../../env'
import { Expression, IExpression } from '../expression'
import { NameExpression } from './name'

export class ContextSwitchExpression extends Expression {
	type = 'NameExpression'

	constructor(
		protected leftExpr: NameExpression,
		protected rightExpr: NameExpression
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
		this.rightExpr.setExecutionEnv(
			new ExecutionEnvironment(
				this.leftExpr.eval(),
				this.rightExpr.executionEnv.config
			)
		)
		return this.rightExpr.eval()
	}

	toString() {
		return `${this.leftExpr.toString()}->${this.rightExpr.toString()}`
	}
}

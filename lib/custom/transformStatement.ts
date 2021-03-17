import { IExpression } from '../parser/expression'
import { GroupExpression } from '../parser/expressions/group'
import { ReturnExpression } from '../parser/expressions/return'
import { StatementExpression } from '../parser/expressions/statement'

export function transformStatement(expression: IExpression) {
	if (expression instanceof ReturnExpression)
		return new GroupExpression(expression.allExpressions[0], '()')
	if (!(expression instanceof StatementExpression)) return expression
	if (expression.allExpressions.length > 1) return expression

	// Only one statement, test whether it is a return statement
	const expr = expression.allExpressions[0]
	if (expr instanceof ReturnExpression) {
		return new GroupExpression(expr.allExpressions[0], '()')
	} else {
		return expression
	}
}

import { Parser } from '../parse'
import { Token } from '../../tokenizer/token'
import { IPrefixParselet } from './prefix'
import { IExpression } from '../expression'
import { EPrecedence } from '../precedence'
import { StaticExpression } from '../expressions/static'
import { StatementExpression } from '../expressions/statement'
import { GroupExpression } from '../expressions/group'

export class ScopeParselet implements IPrefixParselet {
	constructor(public precedence = 0) {}

	parse(parser: Parser, token: Token) {
		let expr
		let hadClosingBracket = false
		let expressions: IExpression[] = []
		do {
			if (parser.match('CURLY_RIGHT')) {
				hadClosingBracket = true
				break
			}

			expr = parser.parseExpression(EPrecedence.STATEMENT)

			if (parser.config.useOptimizer) {
				if (expr.isStatic())
					expr = new StaticExpression(expr.eval(), expr.isReturn)
				if (expr.isReturn) {
					expressions.push(expr)
					break
				}
			}

			expressions.push(expr)
		} while (parser.match('SEMICOLON') || expr.isReturn)

		if (!hadClosingBracket && !parser.match('CURLY_RIGHT'))
			throw new Error(`Missing closing curly bracket`)

		const statementExpr = new StatementExpression(expressions)

		return parser.config.keepGroups
			? new GroupExpression(statementExpr, '{}')
			: statementExpr
	}
}

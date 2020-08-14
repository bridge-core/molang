import { Parser } from '../parse'
import { TToken } from '../../tokenizer/token'
import { IPrefixParselet } from './prefix'
import { IExpression } from '../expression'
import { EPrecedence } from '../precedence'
import { StaticExpression } from '../expressions/static'
import { StatementExpression } from '../expressions/statement'

export class ScopeParselet implements IPrefixParselet {
	constructor(public precedence = 0) {}

	parse(parser: Parser, token: TToken) {
		let expr
		let hadClosingBracket = false
		let expressions: IExpression[] = []
		do {
			if (parser.match('CURLY_RIGHT')) {
				hadClosingBracket = true
				break
			}

			expr = parser.parseExpression(EPrecedence.STATEMENT)

			if (parser.useOptimizer) {
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

		return new StatementExpression(expressions)
	}
}

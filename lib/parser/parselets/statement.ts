import { Parser } from '../parse'
import { IExpression } from '../expression'
import { Token } from '../../tokenizer/token'
import { IInfixParselet } from './infix'
import { StatementExpression } from '../expressions/statement'
import { StaticExpression } from '../expressions/static'

export class StatementParselet implements IInfixParselet {
	constructor(public precedence = 0) {}

	findReEntryPoint(parser: Parser) {
		let bracketCount = 1
		let tokenType = parser.lookAhead(0).getType()
		while (tokenType !== 'EOF') {
			if (tokenType == 'CURLY_RIGHT') bracketCount--
			else if (tokenType === 'CURLY_LEFT') bracketCount++
			if (bracketCount === 0) break

			parser.consume()
			tokenType = parser.lookAhead(0).getType()
		}
	}

	parse(parser: Parser, left: IExpression, token: Token) {
		if (parser.config.useOptimizer) {
			if (left.isStatic())
				left = new StaticExpression(left.eval(), left.isReturn)

			if (parser.config.earlyReturnsSkipParsing && left.isReturn) {
				if (!parser.config.earlyReturnsSkipTokenization)
					this.findReEntryPoint(parser)

				return new StatementExpression([left])
			}
		}

		const expressions: IExpression[] = [left]

		if (!parser.match('CURLY_RIGHT', false)) {
			do {
				let expr = parser.parseExpression(this.precedence)
				if (parser.config.useOptimizer) {
					if (expr.isStatic()) {
						if (
							parser.config.useAgressiveStaticOptimizer &&
							!expr.isReturn
						)
							continue
						expr = new StaticExpression(expr.eval(), expr.isReturn)
					}

					if (
						parser.config.earlyReturnsSkipParsing &&
						(expr.isBreak || expr.isContinue || expr.isReturn)
					) {
						expressions.push(expr)

						if (!parser.config.earlyReturnsSkipTokenization)
							this.findReEntryPoint(parser)

						return new StatementExpression(expressions)
					}
				}

				expressions.push(expr)
			} while (
				parser.match('SEMICOLON') &&
				!parser.match('EOF') &&
				!parser.match('CURLY_RIGHT', false)
			)
		}

		parser.match('SEMICOLON')

		const statementExpr = new StatementExpression(expressions)
		// if (parser.config.useOptimizer && statementExpr.isStatic()) {
		// 	return new StaticExpression(
		// 		statementExpr.eval(),
		// 		statementExpr.isReturn
		// 	)
		// }
		return statementExpr
	}
}

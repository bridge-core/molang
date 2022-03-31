import { IPrefixParselet } from './prefix'
import { Token } from '../../tokenizer/token'
import { Parser } from '../parse'
import { NameExpression } from '../expressions/name'
import { ContextSwitchExpression } from '../expressions/ContextSwitch'
import { FunctionExpression } from '../expressions/function'
import { EPrecedence } from '../precedence'

export class NameParselet implements IPrefixParselet {
	constructor(public precedence = 0) {}

	parse(parser: Parser, token: Token) {
		const nameExpr = new NameExpression(
			parser.executionEnv,
			token.getText()
		)
		const nextTokens = <const>[parser.lookAhead(0), parser.lookAhead(1)]

		// Context switching operator "->"
		if (
			nextTokens[0].getType() === 'MINUS' &&
			nextTokens[1].getType() === 'GREATER'
		) {
			parser.consume('MINUS')
			parser.consume('GREATER')

			const expr = parser.parseExpression(EPrecedence.FUNCTION - 1)

			if (
				expr.type !== 'NameExpression' &&
				expr.type !== 'FunctionExpression'
			)
				throw new Error(
					`Cannot use context switch operator "->" on ${expr.type}`
				)

			return new ContextSwitchExpression(
				nameExpr,
				<NameExpression | FunctionExpression>expr
			)
		}

		return nameExpr
	}
}

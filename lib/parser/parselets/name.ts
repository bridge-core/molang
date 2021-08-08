import { IPrefixParselet } from './prefix'
import { Token } from '../../tokenizer/token'
import { Parser } from '../parse'
import { NameExpression } from '../expressions/name'
import { ContextSwitchExpression } from '../expressions/ContextSwitch'

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

			const nameToken = parser.lookAhead(0)
			if (nameToken.getType() !== 'NAME')
				throw new Error(
					`Cannot use context switch operator "->" on ${parser.lookAhead(
						0
					)}`
				)

			parser.consume('NAME')

			return new ContextSwitchExpression(
				nameExpr,
				new NameExpression(parser.executionEnv, nameToken.getText())
			)
		}

		return nameExpr
	}
}

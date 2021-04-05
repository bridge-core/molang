import { Parser } from '../parse'
import { Token } from '../../tokenizer/token'
import { IPrefixParselet } from './prefix'
import { GroupExpression } from '../expressions/group'

export class ScopeParselet implements IPrefixParselet {
	constructor(public precedence = 0) {}

	parse(parser: Parser, token: Token) {
		let expr = parser.parseExpression(this.precedence)

		if (
			parser.config.useOptimizer &&
			parser.config.earlyReturnsSkipTokenization &&
			expr.isReturn
		)
			parser.match('CURLY_RIGHT')
		else parser.consume('CURLY_RIGHT')

		return parser.config.keepGroups ? new GroupExpression(expr, '{}') : expr
	}
}

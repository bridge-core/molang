import { IPrefixParselet } from './prefix'
import { Token } from '../../tokenizer/token'
import { Parser } from '../parse'
import { NameExpression } from '../expressions/name'
import { StaticExpression } from '../expressions/static'

export class NameParselet implements IPrefixParselet {
	constructor(public precedence = 0) {}

	parse(parser: Parser, token: Token) {
		const tokenText = token.getText()

		if (
			parser.config.partialResolveOnParse &&
			parser.executionEnv.isInitialKey(tokenText)
		) {
			if (parser.match('ASSIGN', false)) {
				// TODO: Change existing var but omit assignment statement from build output
			} else {
				const varValue = parser.executionEnv.getFrom(tokenText)
				if (varValue !== undefined)
					return new StaticExpression(varValue)
			}
		}

		return new NameExpression(parser.executionEnv, tokenText)
	}
}

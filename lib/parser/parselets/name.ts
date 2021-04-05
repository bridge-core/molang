import { IPrefixParselet } from './prefix'
import { Token } from '../../tokenizer/token'
import { Parser } from '../parse'
import { NameExpression } from '../expressions/name'
import { StaticExpression } from '../expressions/static'

export class NameParselet implements IPrefixParselet {
	constructor(public precedence = 0) {}

	parse(parser: Parser, token: Token) {
		return new NameExpression(parser.executionEnv, token.getText())
	}
}

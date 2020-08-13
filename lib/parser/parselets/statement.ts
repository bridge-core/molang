import { Parser } from '../parse'
import { IExpression } from '../expression'
import { TToken } from '../../tokenizer/token'
import { IInfixParselet } from './infix'
import { StatementExpression } from '../expressions/statement'

export class StatementParselet implements IInfixParselet {
	constructor(public precedence = 0) {}

	parse(parser: Parser, left: IExpression, token: TToken) {
		return new StatementExpression(left, parser.parseExpression())
	}
}

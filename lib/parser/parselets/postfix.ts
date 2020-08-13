import { Parser } from '../parse'
import { IExpression } from '../expression'
import { TToken } from '../../tokenizer/token'
import { IInfixParselet } from './infix'
import { PostfixExpression } from '../expressions/postfix'

export class PostfixOperatorParselet implements IInfixParselet {
	constructor(public precedence = 0) {}

	parse(parser: Parser, left: IExpression, token: TToken) {
		return new PostfixExpression(left, token[0])
	}
}

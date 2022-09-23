import { Parser } from '../../parser/parse'
import { Token } from '../../tokenizer/token'
import { IExpression } from '../expression'
import { NameExpression, PostfixExpression } from '../expressions'
import { IPostfixParselet } from './postfix'

export class PostInDecrementOperator implements IPostfixParselet {
	constructor(public precedence = 0) {}

	parse(parser: Parser, leftExpression: IExpression, token: Token) {

        if(!(leftExpression instanceof NameExpression) || (leftExpression as NameExpression).isFunction())
            throw new Error(`Cannot use postfix ${token.getText()} on ${leftExpression.toString()}`)

		return new PostfixExpression(
            parser.executionEnv,
			leftExpression,
			token.getType()
		)
	}
}

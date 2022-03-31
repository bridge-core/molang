import { Token } from '../../tokenizer/token'
import { Parser } from '../parse'
import { IInfixParselet } from './infix'
import { IExpression } from '../expression'
import { FunctionExpression } from '../expressions/function'
import { NameExpression } from '../expressions'

export class FunctionParselet implements IInfixParselet {
	constructor(public precedence = 0) {}

	parse(parser: Parser, left: IExpression, token: Token) {
		const args: IExpression[] = []

		if (!left.setFunctionCall)
			throw new Error(`${left.type} is not callable!`)

		left.setFunctionCall(true)

		if (!parser.match('RIGHT_PARENT')) {
			do {
				args.push(parser.parseExpression())
			} while (parser.match('COMMA'))
			parser.consume('RIGHT_PARENT')
		}

		// Must be a NameExpression because the .setFunctionCall() method exists
		return new FunctionExpression(<NameExpression>left, args)
	}
}

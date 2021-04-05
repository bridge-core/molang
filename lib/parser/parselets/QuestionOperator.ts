import { Parser } from '../parse'
import { Token } from '../../tokenizer/token'
import { IExpression } from '../expression'
import { GenericOperatorExpression } from '../expressions/genericOperator'
import { IInfixParselet } from './infix'
import { TernaryParselet } from './ternary'
import { EPrecedence } from '../precedence'

const ternaryParselet = new TernaryParselet(EPrecedence.CONDITIONAL)
export class QuestionOperator implements IInfixParselet {
	constructor(public precedence = 0) {}

	parse(parser: Parser, leftExpression: IExpression, token: Token) {
		if (parser.match('QUESTION')) {
			return new GenericOperatorExpression(
				leftExpression,
				parser.parseExpression(this.precedence),
				'??',
				(leftExpression: IExpression, rightExpression: IExpression) =>
					leftExpression.eval() ?? rightExpression.eval()
			)
		} else {
			return ternaryParselet.parse(parser, leftExpression, token)
		}
	}
}

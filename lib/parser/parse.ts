import { tokenize, IIterator } from '../tokenizer/tokenize'
import { TTokenType, TToken } from '../tokenizer/token'
import { IPrefixParselet } from './parselets/prefix'
import { IInfixParselet } from './parselets/infix'

export class Parser {
	protected prefixParselets = new Map<TTokenType, IPrefixParselet>()
	protected infixParselets = new Map<TTokenType, IInfixParselet>()
	protected readTokens: TToken[] = []

	constructor(protected tokenIterator: IIterator) {}

	parse() {
		return this.parseExpression(0)
	}

	parseExpression(precedence: number) {
		let token = this.tokenIterator.next()

		const prefix = this.prefixParselets.get(token[0])
		if (!prefix) throw new Error(`Cannot parse expression "${token[1]}"`)

		let expressionLeft = prefix.parse(this, token)
		while (precedence < this.getPrecedence()) {
			token = this.consume()

			const infix = <IInfixParselet>this.infixParselets.get(token[0])
			expressionLeft = infix.parse(this, expressionLeft, token)
		}

		return expressionLeft
	}

	getPrecedence() {
		const parser = this.infixParselets.get(this.lookAhead(0)[0])
		if (parser) return parser.precedence

		return 0
	}

	consume(expected?: TTokenType) {
		const token = this.lookAhead(0)
		if (expected && token[0] !== expected)
			throw new Error(
				`Expected token "${expected}" and found "${token[0]}"`
			)

		return <TToken>this.readTokens.pop()
	}

	match(expected: TTokenType) {
		const token = this.lookAhead(0)
		if (token[0] !== expected) return false

		this.consume()
		return true
	}

	lookAhead(distance: number) {
		while (distance <= this.readTokens.length)
			this.readTokens.push(this.tokenIterator.next())

		return this.readTokens[distance]
	}

	registerInfix(tokenType: TTokenType, infixParselet: IInfixParselet) {
		this.infixParselets.set(tokenType, infixParselet)
	}
	registerPrefix(tokenType: TTokenType, prefixParselet: IPrefixParselet) {
		this.prefixParselets.set(tokenType, prefixParselet)
	}
}

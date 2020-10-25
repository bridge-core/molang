import { IIterator } from '../tokenizer/tokenize'
import { TTokenType, TToken } from '../tokenizer/token'
import { IPrefixParselet } from './parselets/prefix'
import { IInfixParselet } from './parselets/infix'
import { IExpression } from './expression'
import { NumberExpression } from './expressions/number'

export class Parser {
	protected prefixParselets = new Map<TTokenType, IPrefixParselet>()
	protected infixParselets = new Map<TTokenType, IInfixParselet>()
	protected readTokens: TToken[] = []
	protected lastConsumed: TToken = ['SOF', '']

	constructor(
		protected tokenIterator: IIterator,
		public readonly useOptimizer = false,
		public readonly agressiveStaticOptimizer = true,
		public readonly partialResolveOnParse = false
	) {}

	parseExpression(precedence = 0): IExpression {
		let token = this.consume()
		if (token[0] === 'EOF') return new NumberExpression(0)

		const prefix = this.prefixParselets.get(token[0])
		if (!prefix)
			throw new Error(`Cannot parse ${token[0]} expression "${token[1]}"`)

		let expressionLeft = prefix.parse(this, token)
		if (expressionLeft.isReturn) return expressionLeft
		return this.parseInfixExpression(expressionLeft, precedence)
	}

	parseInfixExpression(expressionLeft: IExpression, precedence = 0) {
		let token

		while (precedence < this.getPrecedence()) {
			token = this.consume()

			const infix = <IInfixParselet>this.infixParselets.get(token[0])
			expressionLeft = infix.parse(this, expressionLeft, token)
		}

		return expressionLeft
	}

	getPrecedence() {
		const parselet = this.infixParselets.get(this.lookAhead(0)?.[0])
		return parselet?.precedence ?? 0
	}
	getLastConsumed() {
		return this.lastConsumed
	}

	consume(expected?: TTokenType) {
		//Sets the lastLineNumber & startColumn before consuming next token
		//Used for getting the exact location an error occurs
		this.tokenIterator.step()

		const token = this.lookAhead(0)

		if (expected) {
			if (token[0] !== expected)
				throw new Error(
					`Expected token "${expected}" and found "${token[0]}"`
				)
			else this.consume()
		}

		this.lastConsumed = <TToken>this.readTokens.pop()
		return this.lastConsumed
	}

	match(expected: TTokenType, consume = true) {
		const token = this.lookAhead(0)
		if (token[0] !== expected) return false

		if (consume) this.consume()
		return true
	}

	lookAhead(distance: number) {
		while (distance >= this.readTokens.length)
			this.readTokens.push(this.tokenIterator.next())

		return this.readTokens[distance]
	}

	registerInfix(tokenType: TTokenType, infixParselet: IInfixParselet) {
		this.infixParselets.set(tokenType, infixParselet)
	}
	registerPrefix(tokenType: TTokenType, prefixParselet: IPrefixParselet) {
		this.prefixParselets.set(tokenType, prefixParselet)
	}

	getInfix(tokenType: TTokenType) {
		return this.infixParselets.get(tokenType)
	}
	getPrefix(tokenType: TTokenType) {
		return this.prefixParselets.get(tokenType)
	}

	getTokenizerPosition() {
		return this.tokenIterator.getPosition()
	}
}

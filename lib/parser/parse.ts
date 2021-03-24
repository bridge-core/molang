import { Tokenizer } from '../tokenizer/main'
import { TTokenType, Token } from '../tokenizer/token'
import { IPrefixParselet } from './parselets/prefix'
import { IInfixParselet } from './parselets/infix'
import { IExpression } from './expression'
import { ExecutionEnvironment } from '../env'
import { IParserConfig } from '../main'
import { VoidExpression } from './expressions/void'

export class Parser {
	protected prefixParselets = new Map<TTokenType, IPrefixParselet>()
	protected infixParselets = new Map<TTokenType, IInfixParselet>()
	protected readTokens: Token[] = []
	protected lastConsumed: Token = new Token('SOF', '', 0, 0)
	protected tokenIterator = new Tokenizer()
	executionEnv!: ExecutionEnvironment

	constructor(public config: Partial<IParserConfig>) {}

	updateConfig(config: Partial<IParserConfig>) {
		this.config = config
	}

	init(expression: string) {
		this.tokenIterator.init(expression)
		this.lastConsumed = new Token('SOF', '', 0, 0)
		this.readTokens = []
	}
	setTokenizer(tokenizer: Tokenizer) {
		this.tokenIterator = tokenizer
	}
	setExecutionEnvironment(executionEnv: ExecutionEnvironment) {
		this.executionEnv = executionEnv
	}

	parseExpression(precedence = 0): IExpression {
		let token = this.consume()
		if (token.getType() === 'EOF') return new VoidExpression()

		const prefix = this.prefixParselets.get(token.getType())
		if (!prefix) {
			throw new Error(
				`Cannot parse ${token.getType()} expression "${token.getType()}"`
			)
		}

		let expressionLeft = prefix.parse(this, token)
		return this.parseInfixExpression(expressionLeft, precedence)
	}

	parseInfixExpression(expressionLeft: IExpression, precedence = 0) {
		let token

		while (this.getPrecedence() > precedence) {
			token = this.consume()

			const infix = <IInfixParselet>(
				this.infixParselets.get(token.getType())
			)
			expressionLeft = infix.parse(this, expressionLeft, token)
		}

		return expressionLeft
	}

	getPrecedence() {
		const parselet = this.infixParselets.get(this.lookAhead(0)?.getType())
		return parselet?.precedence ?? 0
	}
	getLastConsumed() {
		return this.lastConsumed
	}

	consume(expected?: TTokenType) {
		//Sets the lastLineNumber & startColumn before consuming next token
		//Used for getting the exact location an error occurs
		// this.tokenIterator.step()

		const token = this.lookAhead(0)

		if (expected) {
			if (token.getType() !== expected) {
				throw new Error(
					`Expected token "${expected}" and found "${token.getType()}"`
				)
			} else {
				this.consume()
			}
		}

		this.lastConsumed = <Token>this.readTokens.pop()
		return this.lastConsumed
	}

	match(expected: TTokenType, consume = true) {
		const token = this.lookAhead(0)
		if (token.getType() !== expected) return false

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
}

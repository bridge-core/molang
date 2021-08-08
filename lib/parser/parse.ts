import { Tokenizer } from '../tokenizer/Tokenizer'
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
	protected tokenIterator = new Tokenizer()
	executionEnv!: ExecutionEnvironment

	constructor(public config: Partial<IParserConfig>) {}

	updateConfig(config: Partial<IParserConfig>) {
		this.config = config
	}

	init(expression: string) {
		this.tokenIterator.init(expression)
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
			let tokenType = token.getType()
			if (tokenType === 'EQUALS' && !this.match('EQUALS')) {
				tokenType = 'ASSIGN'
			}

			const infix = <IInfixParselet>this.infixParselets.get(tokenType)
			if (!infix)
				throw new Error(`Unknown infix parselet: "${tokenType}"`)
			expressionLeft = infix.parse(this, expressionLeft, token)
		}

		return expressionLeft
	}

	getPrecedence() {
		const parselet = this.infixParselets.get(this.lookAhead(0).getType())
		return parselet?.precedence ?? 0
	}

	consume(expected?: TTokenType) {
		//Sets the lastLineNumber & startColumn before consuming next token
		//Used for getting the exact location an error occurs
		// this.tokenIterator.step()

		const token = this.lookAhead(0)

		if (expected && token.getType() !== expected) {
			throw new Error(
				`Expected token "${expected}" and found "${token.getType()}"`
			)
		}

		this.readTokens.shift()!
		return token
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

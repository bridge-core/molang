import { TokenTypes, KeywordTokens } from './tokenTypes'
import { Token } from './token'

export class Tokenizer {
	protected keywordTokens: Set<string>
	protected i = 0
	protected currentColumn = 0
	protected currentLine = 0
	protected expression!: string

	constructor(addKeywords?: Set<string>) {
		if (addKeywords)
			this.keywordTokens = new Set([...KeywordTokens, ...addKeywords])
		else this.keywordTokens = KeywordTokens
	}

	init(expression: string) {
		this.currentLine = 0
		this.currentColumn = 0
		this.i = 0
		this.expression = expression
	}

	next(): Token {
		while (this.i < this.expression.length) {
			let token =
				this.i + 1 < this.expression.length
					? TokenTypes[
							this.expression[this.i] +
								this.expression[this.i + 1]
					  ]
					: undefined

			if (token) {
				this.i++
				return new Token(
					token,
					this.expression[this.i - 1] + this.expression[this.i++],
					this.currentColumn,
					this.currentLine
				)
			}

			token = TokenTypes[this.expression[this.i]]
			if (token) {
				return new Token(
					token,
					this.expression[this.i++],
					this.currentColumn,
					this.currentLine
				)
			} else if (this.expression[this.i] === "'") {
				let j = this.i + 1
				while (
					j < this.expression.length &&
					this.expression[j] !== "'"
				) {
					j++
				}
				j++
				const token = new Token(
					'STRING',
					this.expression.substring(this.i, j),
					this.currentColumn,
					this.currentLine
				)
				this.i = j
				return token
			} else if (this.isLetter(this.expression[this.i])) {
				let j = this.i + 1
				while (
					j < this.expression.length &&
					(this.isLetter(this.expression[j]) ||
						this.isNumber(this.expression[j]) ||
						this.expression[j] === '_' ||
						this.expression[j] === '.')
				) {
					j++
				}

				const value = this.expression.substring(this.i, j).toLowerCase()

				this.i = j
				return new Token(
					this.keywordTokens.has(value)
						? value.toUpperCase()
						: 'NAME',
					value,
					this.currentColumn,
					this.currentLine
				)
			} else if (this.isNumber(this.expression[this.i])) {
				let j = this.i + 1
				let hasDecimal = false
				while (
					j < this.expression.length &&
					(this.isNumber(this.expression[j]) ||
						(this.expression[j] === '.' && !hasDecimal))
				) {
					if (this.expression[j] === '.') hasDecimal = true
					j++
				}

				const token = new Token(
					'NUMBER',
					this.expression.substring(this.i, j),
					this.currentColumn,
					this.currentLine
				)
				this.i = j
				return token
			} else if (this.expression[this.i] === '\n') {
				this.currentLine++
				this.currentColumn = 0
			} else {
				//IGNORE CHARACTER
			}

			this.i++
			this.currentColumn++
		}

		return new Token('EOF', '', this.currentColumn, this.currentLine)
	}
	hasNext() {
		return this.i < this.expression.length
	}

	protected isLetter(char: string) {
		return (char >= 'a' && char <= 'z') || (char >= 'A' && char <= 'Z')
	}

	protected isNumber(char: string) {
		return char >= '0' && char <= '9'
	}
}

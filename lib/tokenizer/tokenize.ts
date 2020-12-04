import { TokenTypes, KeywordTokens } from './tokenTypes'
import { TToken } from './token'

export interface IIterator {
	next: () => TToken
	hasNext: () => boolean
	step: () => void
	getPosition: () => {
		startLineNumber: number
		endLineNumber: number
		startColumn: number
		endColumn: number
	}
}

export class Tokenizer {
	protected keywordTokens: Set<string>
	protected i = 0
	protected lastStep = 0
	protected currentLine = 0
	protected lastStepLine = 0
	protected expression!: string

	constructor(addKeywords?: Set<string>) {
		if (addKeywords)
			this.keywordTokens = new Set([...KeywordTokens, ...addKeywords])
		else this.keywordTokens = KeywordTokens
	}

	init(expression: string) {
		this.expression = expression
		this.i = 0
		this.lastStep = 0
		this.currentLine = 0
		this.lastStepLine = 0
	}

	getPosition() {
		return {
			startLineNumber: this.lastStepLine,
			endLineNumber: this.currentLine,
			startColumn: this.lastStep,
			endColumn: this.i,
		}
	}
	step() {
		this.lastStep = this.i
		this.lastStepLine = this.currentLine
	}

	next(): TToken {
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
				return [
					token,
					this.expression[this.i - 1] + this.expression[this.i++],
				]
			}

			token = TokenTypes[this.expression[this.i]]
			if (token) {
				return [token, this.expression[this.i++]]
			} else if (this.expression[this.i] === "'") {
				let j = this.i + 1
				while (
					j < this.expression.length &&
					this.expression[j] !== "'"
				) {
					j++
				}
				j++
				const token = <[string, string]>[
					'STRING',
					this.expression.substring(this.i, j),
				]
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
				const token = <[string, string]>[
					this.keywordTokens.has(value)
						? value.toUpperCase()
						: 'NAME',
					value,
				]
				this.i = j
				return token
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

				const token = <[string, string]>[
					'NUMBER',
					this.expression.substring(this.i, j),
				]
				this.i = j
				return token
			} else if (this.expression[this.i] === '\n') {
				this.currentLine++
			} else {
				//IGNORE CHARACTER
			}

			this.i++
		}

		return ['EOF', '']
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

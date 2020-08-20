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
export function tokenize(expression: string): IIterator {
	let i = 0
	let lastStep = 0
	let currentLine = 0
	let lastStepLine = 0

	return {
		getPosition() {
			return {
				startLineNumber: lastStepLine,
				endLineNumber: currentLine,
				startColumn: lastStep,
				endColumn: i,
			}
		},
		step() {
			lastStep = i
			lastStepLine = currentLine
		},
		next(): TToken {
			while (i < expression.length) {
				let token =
					i + 1 < expression.length
						? TokenTypes.get(expression[i] + expression[i + 1])
						: undefined

				if (token) {
					i++
					return [token, expression[i - 1] + expression[i++]]
				}

				token = TokenTypes.get(expression[i])
				if (token) {
					return [token, expression[i++]]
				} else if (expression[i] === "'") {
					let j = i + 1
					while (j < expression.length && expression[j] !== "'") {
						j++
					}
					j++
					const token = <[string, string]>[
						'STRING',
						expression.substring(i, j),
					]
					i = j
					return token
				} else if (isLetter(expression[i])) {
					let j = i + 1
					while (
						j < expression.length &&
						(isLetter(expression[j]) ||
							isNumber(expression[j]) ||
							expression[j] === '_' ||
							expression[j] === '.')
					) {
						j++
					}

					const value = expression.substring(i, j).toLowerCase()
					const token = <[string, string]>[
						KeywordTokens.has(value) ? value.toUpperCase() : 'NAME',
						value,
					]
					i = j
					return token
				} else if (isNumber(expression[i])) {
					let j = i + 1
					let hasDecimal = false
					while (
						j < expression.length &&
						(isNumber(expression[j]) ||
							(expression[j] === '.' && !hasDecimal))
					) {
						if (expression[j] === '.') hasDecimal = true
						j++
					}

					const token = <[string, string]>[
						'NUMBER',
						expression.substring(i, j),
					]
					i = j
					return token
				} else if (expression[i] === '\n' || expression[i] === '\r') {
					currentLine++
				} else {
					//IGNORE CHARACTER
				}

				i++
			}

			return ['EOF', '']
		},
		hasNext() {
			return i < expression.length
		},
	}
}

export function isLetter(char: string) {
	return char >= 'a' && char <= 'z'
}

export function isNumber(char: string) {
	return char >= '0' && char <= '9'
}

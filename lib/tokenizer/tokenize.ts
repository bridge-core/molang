import { TokenTypes } from './tokenTypes'
import { TToken } from './token'

export interface IIterator {
	next: () => TToken
	hasNext: () => boolean
}
export function tokenize(expression: string) {
	const tokens: TToken[] = []
	let i = 0

	while (i < expression.length) {
		const token = TokenTypes.get(expression[i])
		if (token) {
			tokens.push([token, expression[i]])
		} else if (isLetter(expression[i])) {
			let j = i + 1
			while (
				j < expression.length &&
				(isLetter(expression[j]) || isNumber(expression[j]))
			) {
				j++
			}

			tokens.push(['NAME', expression.substring(i, j)])
			i = j - 1
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

			tokens.push(['NUMBER', expression.substring(i, j)])
			i = j - 1
		} else {
			//IGNORE CHARACTER
		}

		i++
	}

	let iteraterIndex = 0
	return {
		next() {
			if (!this.hasNext())
				//return ['EOF', ''] as [string, string]
				throw new Error('Cannot call next() without next element!')
			return tokens[iteraterIndex++]
		},
		hasNext() {
			return iteraterIndex < tokens.length
		},
	}
}

export function isLetter(char: string) {
	return char >= 'a' && char <= 'z'
}

export function isNumber(char: string) {
	return char >= '0' && char <= '9'
}

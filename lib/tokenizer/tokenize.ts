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
			while (j < expression.length && isLetter(expression[j])) {
				j++
			}

			tokens.push(['NAME', expression.substring(i, j)])
		} else {
			//IGNORE CHARACTER
		}

		i++
	}

	let iteraterIndex = 0
	return {
		next() {
			if (!this.hasNext())
				throw new Error('Cannot call next() without next element!')
			return tokens[iteraterIndex++]
		},
		hasNext() {
			return iteraterIndex <= tokens.length
		},
	}
}

export function isLetter(char: string) {
	return char >= 'a' && char <= 'z'
}

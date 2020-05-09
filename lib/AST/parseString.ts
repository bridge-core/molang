export function parseString(expression: string) {
	const markOps: [string, number][] = []

	const brackets = {
		default: 0,
		squirly: 0,
		square: 0,
	}

	for (let i = 0; i < expression.length; i++) {
		const char = expression[i]
		const nextChar = expression[i]

		if (char === '(') brackets.default++
		else if (char === ')') brackets.default--
		else if (char === '[') brackets.square++
		else if (char === ']') brackets.square--
		else if (char === '{') brackets.squirly++
		else if (char === '}') brackets.squirly--
		else if (
			i !== 0 &&
			brackets.default === 0 &&
			brackets.square === 0 &&
			brackets.squirly === 0
		) {
			const word = char + nextChar
			if (word === '&&') {
				markOps.push(['&&', i])
				i++
			} else if (word === '||') {
				markOps.push(['||', i])
				i++
			} else if (char === '+') {
				markOps.push(['+', i])
			} else if (char === '-') {
				markOps.push(['+', i])
			}
		}
	}

	return markOps
}

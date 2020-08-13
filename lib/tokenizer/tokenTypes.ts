export const TokenTypes = new Map<string, string>([
	['==', 'EQUALS'],
	['!=', 'NOT_EQUALS'],
	['&&', 'AND'],
	['||', 'OR'],
	['>=', 'GREATER_OR_EQUALS'],
	['<=', 'SMALLER_OR_EQUALS'],

	['>', 'GREATER'],
	['<', 'SMALLER'],
	['(', 'LEFT_PARENT'],
	[')', 'RIGHT_PARENT'],
	[',', 'COMMA'],
	['=', 'ASSIGN'],
	['+', 'PLUS'],
	['-', 'MINUS'],
	['*', 'ASTERISK'],
	['/', 'SLASH'],
	['?', 'QUESTION'],
	[':', 'COLON'],
	[';', 'SEMICOLON'],
	['!', 'BANG'],
	['.', 'PERIOD'],
])

export const KeywordTokens = new Set(['return'])

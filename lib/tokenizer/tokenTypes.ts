export const TokenTypes = new Map<string, string>([
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

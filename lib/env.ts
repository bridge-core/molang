import { MoLangMathLib } from './math'

let env: Record<string, any> = {}

function flattenEnv(
	newEnv: Record<string, any>,
	addKey = '',
	current: any = {}
) {
	for (let key in newEnv) {
		if (typeof newEnv[key] === 'object' && !Array.isArray(newEnv[key])) {
			flattenEnv(newEnv[key], `${addKey}${key}.`, current)
		} else {
			current[`${addKey}${key}`] = newEnv[key]
		}
	}

	return current
}

/**
 * The environment to execute all following MoLang expression without a given environment
 *
 * Once an `execute` call with a provided environment happens, the default environment gets overwritten
 */
export function setEnv(newEnv: Record<string, any>) {
	env = {
		...MoLangMathLib,
		...flattenEnv(newEnv),
	}
}

export function getFromEnv(lookup: string) {
	if (lookup[1] === '.') {
		switch (lookup[0]) {
			case 'q':
				lookup = 'query' + lookup.substring(1, lookup.length)
				break
			case 't':
				lookup = 'temp' + lookup.substring(1, lookup.length)
				break
			case 'v':
				lookup = 'variable' + lookup.substring(1, lookup.length)
				break
			case 'c':
				lookup = 'context' + lookup.substring(1, lookup.length)
				break
			case 'f':
				lookup = 'function' + lookup.substring(1, lookup.length)
				break
		}
	}

	return env[lookup]
}
export function setEnvAt(lookup: string, value: unknown) {
	if (lookup[1] === '.') {
		switch (lookup[0]) {
			case 'q':
				lookup = 'query' + lookup.substring(1, lookup.length)
				break
			case 't':
				lookup = 'temp' + lookup.substring(1, lookup.length)
				break
			case 'v':
				lookup = 'variable' + lookup.substring(1, lookup.length)
				break
			case 'c':
				lookup = 'context' + lookup.substring(1, lookup.length)
				break
			case 'f':
				lookup = 'function' + lookup.substring(1, lookup.length)
				break
		}
	}

	return (env[lookup] = value)
}

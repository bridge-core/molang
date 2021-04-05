import { MoLangMathLib } from './math'

export class ExecutionEnvironment {
	protected env: Record<string, any>

	constructor(env: Record<string, any>) {
		this.env = {
			...MoLangMathLib,
			...this.flattenEnv(env),
		}
	}

	protected flattenEnv(
		newEnv: Record<string, any>,
		addKey = '',
		current: any = {}
	) {
		for (let key in newEnv) {
			if (key[1] === '.') {
				switch (key[0]) {
					case 'q':
						key = 'query' + key.substring(1, key.length)
						break
					case 't':
						key = 'temp' + key.substring(1, key.length)
						break
					case 'v':
						key = 'variable' + key.substring(1, key.length)
						break
					case 'c':
						key = 'context' + key.substring(1, key.length)
						break
					case 'f':
						key = 'function' + key.substring(1, key.length)
						break
				}
			}

			if (
				typeof newEnv[key] === 'object' &&
				!Array.isArray(newEnv[key])
			) {
				this.flattenEnv(newEnv[key], `${addKey}${key}.`, current)
			} else {
				current[`${addKey}${key}`] = newEnv[key]
			}
		}

		return current
	}

	setAt(lookup: string, value: unknown) {
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

		return (this.env[lookup] = value)
	}

	getFrom(lookup: string) {
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

		return this.env[lookup]
	}
}

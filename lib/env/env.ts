import { standardEnv } from './standardEnv'

export type TVariableHandler = (
	variableName: string,
	variables: Record<string, unknown>
) => unknown

export interface IEnvConfig {
	useRadians?: boolean
	convertUndefined?: boolean
	variableHandler?: TVariableHandler
	isFlat?: boolean
}

export class ExecutionEnvironment {
	protected env: Record<string, any>

	constructor(env: Record<string, any>, public readonly config: IEnvConfig) {
		if (!env) throw new Error(`Provided environment must be an object`)

		this.env = {
			...standardEnv(config.useRadians ?? false),
			'query.self': () => this.env,
			...(config.isFlat ? env : this.flattenEnv(env)),
		}
	}

	updateConfig({
		variableHandler,
		convertUndefined,
		useRadians,
	}: IEnvConfig) {
		if (convertUndefined !== undefined)
			this.config.convertUndefined = convertUndefined
		if (typeof variableHandler === 'function')
			this.config.variableHandler = variableHandler

		if (!!this.config.useRadians !== !!useRadians) {
			this.env = Object.assign(this.env, standardEnv(!!useRadians))
		}
	}

	protected flattenEnv(
		newEnv: Record<string, any>,
		addKey = '',
		current: any = {}
	) {
		for (let key in newEnv) {
			let newKey = key

			if (key[1] === '.') {
				switch (key[0]) {
					case 'q':
						newKey = 'query' + key.substring(1, key.length)
						break
					case 't':
						newKey = 'temp' + key.substring(1, key.length)
						break
					case 'v':
						newKey = 'variable' + key.substring(1, key.length)
						break
					case 'c':
						newKey = 'context' + key.substring(1, key.length)
						break
					case 'f':
						newKey = 'function' + key.substring(1, key.length)
						break
				}
			}

			if (newEnv[key].__isContext) {
				current[`${addKey}${newKey}`] = newEnv[key].env
			} else if (
				typeof newEnv[key] === 'object' &&
				!Array.isArray(newEnv[key])
			) {
				this.flattenEnv(newEnv[key], `${addKey}${key}.`, current)
			} else {
				current[`${addKey}${newKey}`] = newEnv[key]
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

		const res =
			this.env[lookup] ?? this.config.variableHandler?.(lookup, this.env)
		return res === undefined && this.config.convertUndefined ? 0 : res
	}
}

export class Context {
	public readonly __isContext = true
	constructor(public readonly env: any) {}
}

let env: any = {}

export function setEnv(newEnv: any) {
	env = newEnv
}

export function getFromEnv(lookup: string) {
	const arr = lookup.split('.')
	let current = env

	let i = 0
	while (i < arr.length) {
		current = current[arr[i++]]
	}
	return current
}
export function setEnvAt(lookup: string, value: unknown) {
	const arr = lookup.split('.')
	let current = env

	let i = 0
	while (i < arr.length - 1) {
		current = current[arr[i++]]
	}
	return (current[arr[i]] = value)
}

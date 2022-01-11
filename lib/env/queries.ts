const inRange = (value: number, min: number, max: number) => {
	// Check that value, min and max are numbers
	if (
		typeof value !== 'number' ||
		typeof min !== 'number' ||
		typeof max !== 'number'
	) {
		console.error('"query.in_range": value, min and max must be numbers')
		return false
	}

	return value >= min && value <= max
}

const all = (mustMatch: unknown, ...values: unknown[]) =>
	values.every((v) => v === mustMatch)

const any = (mustMatch: unknown, ...values: unknown[]) =>
	values.some((v) => v === mustMatch)

export const standardQueries = {
	'query.in_range': inRange,
	'query.all': all,
	'query.any': any,
}

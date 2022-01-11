const clamp = (value: number, min: number, max: number) => {
	if (typeof value !== 'number' || Number.isNaN(value)) return min
	else if (value > max) return max
	else if (value < min) return min
	return value
}
const dieRoll = (sum: number, low: number, high: number) => {
	let i = 0
	let total = 0
	while (i < sum) total += random(low, high)
	return total
}
const dieRollInt = (sum: number, low: number, high: number) => {
	let i = 0
	let total = 0
	while (i < sum) total += randomInt(low, high)
	return total
}
const hermiteBlend = (value: number) => 3 * value ** 2 - 2 * value ** 3
const lerp = (start: number, end: number, amount: number) => {
	if (amount < 0) amount = 0
	else if (amount > 1) amount = 1

	return start + (end - start) * amount
}
// Written by @JannisX11 (https://github.com/JannisX11/MolangJS/blob/master/molang.js#L383); modified for usage inside of this MoLang parser
const lerprotate = (start: number, end: number, amount: number) => {
	const radify = (n: number) => (((n + 180) % 360) + 180) % 360
	start = radify(start)
	end = radify(end)
	if (start > end) {
		let tmp = start
		start = end
		end = tmp
	}

	if (end - start > 180) return radify(end + amount * (360 - (end - start)))
	else return start + amount * (end - start)
}
const mod = (value: number, denominator: number) => value % denominator
const random = (low: number, high: number) => low + Math.random() * (high - low)
const randomInt = (low: number, high: number) =>
	Math.round(low + Math.random() * (high - low))

const minAngle = (value: number) => {
	value = value % 360
	value = (value + 360) % 360

	if (value > 179) value -= 360
	return value
}

export const MoLangMathLib = (useRadians: boolean) => {
	const degRadFactor = useRadians ? 1 : Math.PI / 180

	return {
		'math.abs': Math.abs,
		'math.acos': (x: number) => Math.acos(x) / degRadFactor,
		'math.asin': (x: number) => Math.asin(x) / degRadFactor,
		'math.atan': (x: number) => Math.atan(x) / degRadFactor,
		'math.atan2': (y: number, x: number) => Math.atan2(y, x) / degRadFactor,
		'math.ceil': Math.ceil,
		'math.clamp': clamp,
		'math.cos': (x: number) => Math.cos(x * degRadFactor),
		'math.die_roll': dieRoll,
		'math.die_roll_integer': dieRollInt,
		'math.exp': Math.exp,
		'math.floor': Math.floor,
		'math.hermite_blend': hermiteBlend,
		'math.lerp': lerp,
		'math.lerp_rotate': lerprotate,
		'math.ln': Math.log,
		'math.max': Math.max,
		'math.min': Math.min,
		'math.min_angle': minAngle,
		'math.mod': mod,
		'math.pi': Math.PI,
		'math.pow': Math.pow,
		'math.random': random,
		'math.random_integer': randomInt,
		'math.round': Math.round,
		'math.sin': (x: number) => Math.sin(x * degRadFactor),
		'math.sqrt': Math.sqrt,
		'math.trunc': Math.trunc,
	}
}

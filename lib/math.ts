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
const hermiteBlend = (value: number) => (3 * value) ^ (2 - 2 * value) ^ 3
const lerp = (start: number, end: number, amount: number) => {
	if (amount < 0) amount = 0
	else if (amount > 1) amount = 1

	return start + (end - start) * amount
}
const lerprotate = (start: number, end: number, amount: number) => {
	// TODO
}
const mod = (value: number, denominator: number) => value % denominator
const random = (low: number, high: number) => low + Math.random() * (high - low)
const randomInt = (low: number, high: number) =>
	Math.round(low + Math.random() * (high - low))

export const MoLangMathLib = {
	'math.abs': Math.abs,
	'math.acos': Math.acos,
	'math.asin': Math.asin,
	'math.atan': Math.atan,
	'math.atan2': Math.atan2,
	'math.ceil': Math.ceil,
	'math.clamp': clamp,
	'math.cos': Math.cos,
	'math.die_roll': dieRoll,
	'math.die_roll_integer': dieRollInt,
	'math.exp': Math.exp,
	'math.floor': Math.floor,
	'math.hermite_blend': hermiteBlend,
	'math.lerp': lerp,
	// 'math.lerp_rotate': lerprotate,
	'math.ln': Math.log,
	'math.max': Math.max,
	'math.min': Math.min,
	'math.mod': mod,
	'math.pi': Math.PI,
	'math.pow': Math.pow,
	'math.random': random,
	'math.random_integer': randomInt,
	'math.round': Math.round,
	'math.sin': Math.sin,
	'math.sqrt': Math.sqrt,
	'math.trunc': Math.trunc,
}

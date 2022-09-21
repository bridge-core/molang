//@ts-ignore
import MolangJS from 'molangjs'
import { Molang } from '../lib/main'
import { Tokenizer } from '../lib/tokenizer/Tokenizer'
import { bench, describe } from 'vitest'

const expression =
	'variable.hand_bob = query.life_time < 0.01 ? 0.0 : variable.hand_bob + ((query.is_on_ground && query.is_alive ? math.clamp(math.sqrt(math.pow(query.position_delta(0), 2.0) + math.pow(query.position_delta(2), 2.0)), 0.0, 0.1) : 0.0) - variable.hand_bob) * 0.02;'

const env = {
	'variable.hand_bob': 0,
	'query.life_time': () => 0.1,
	'query.is_on_ground': () => 1,
	'query.is_alive': () => 1,
	'query.position_delta': () => 2,
}

const molang = new Molang(env, {
	useCache: false,
})

const tokenizer = new Tokenizer()
describe('Molang Tokenizer', () => {
	bench('Init', () => {
		tokenizer.init(expression)
	})
	bench('Tokenize', () => {
		while (tokenizer.hasNext()) tokenizer.next()
	})
})

const molangjs = new MolangJS()
molangjs.cache_enabled = false

describe('Raw Parse & Execute', () => {
	bench('Molang', () => {
		molang.execute(expression)
	})

	bench('MolangJS', () => {
		molangjs.parse(expression, env)
	})
})

// Update Molang
molang.clearCache()
molang.updateConfig({ useCache: true })
// Update MolangJS
molangjs.cache_enabled = true
describe('Cached Parse & Execute', () => {
	bench('Molang', () => {
		molang.execute(expression)
	})

	bench('MolangJS', () => {
		molangjs.parse(expression, env)
	})
})

describe('Execute', () => {
	bench('Molang', () => {
		molang.execute(expression)
	})

	bench('MolangJS', () => {
		molangjs.parse(expression, env)
	})
})

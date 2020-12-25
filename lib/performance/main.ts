//@ts-ignore
import MolangJS from 'molangjs'
import { MoLang } from '../main'
import { Tokenizer } from '../tokenizer/main'

const iterations = 100000
const expression = 'return 0;'

const env = {
	'variable.hand_bob': 0,
	'query.life_time': () => 0.1,
	'query.is_on_ground': () => true,
	'query.is_alive': () => true,
	'query.position_delta': () => 2,
}

const molang = new MoLang(env, { useCache: false, useOptimizer: true })
console.log('-- MOLANG --')
console.time('[PARSE & EXECUTE] Raw Performance')
for (let i = 0; i < iterations; i++) {
	molang.execute(expression)
}
console.timeEnd('[PARSE & EXECUTE] Raw Performance')
molang.clearCache()
molang.updateConfig({ useCache: true })
console.time('[PARSE & EXECUTE] Cached Performance')
for (let i = 0; i < iterations; i++) {
	molang.execute(expression)
}
console.timeEnd('[PARSE & EXECUTE] Cached Performance')
console.time('[EXECUTE] Performance')
for (let i = 0; i < iterations; i++) {
	molang.execute(expression)
}
console.timeEnd('[EXECUTE] Performance')
console.time('[TOKENIZER] Performance')
const tokenizer = new Tokenizer()
for (let i = 0; i < iterations; i++) {
	tokenizer.init(expression)
	while (tokenizer.hasNext()) tokenizer.next()
}
console.timeEnd('[TOKENIZER] Performance')

console.log('-- MOLANGJS --')
const molangjs = new MolangJS()
molangjs.cache_enabled = false
console.time('[PARSE & EXECUTE] Raw Performance')
for (let i = 0; i < iterations; i++) {
	molangjs.parse(expression, env)
}
console.timeEnd('[PARSE & EXECUTE] Raw Performance')
molangjs.cache_enabled = true
console.time('[PARSE & EXECUTE] Cached Performance')
for (let i = 0; i < iterations; i++) {
	molangjs.parse(expression, env)
}
console.timeEnd('[PARSE & EXECUTE] Cached Performance')
console.time('[EXECUTE] Performance')
for (let i = 0; i < iterations; i++) {
	molangjs.parse(expression, env)
}
console.timeEnd('[EXECUTE] Performance')

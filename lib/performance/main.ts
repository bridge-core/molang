//@ts-ignore
import Molang from 'molangjs'
import { execute, clearCache } from '../main'
import { setEnv } from '../env'

const iterations = 10000
const expression =
	'false ? 1 : 0; false ? 1 : 0; false ? 1 : 0; false ? 1 : 0; false ? 1 : 0; false ? 1 : 0; false ? 1 : 0; false ? 1 : 0; false ? 1 : 0; false ? 1 : 0;'

const env = {
	'variable.hand_bob': 0,
	'query.life_time': () => 0.1,
	'query.is_on_ground': () => true,
	'query.is_alive': () => true,
	'query.position_delta': () => 2,
}

setEnv(env)
console.log('-- MOLANG --')
console.time('[PARSE & EXECUTE] Raw Performance')
for (let i = 0; i < iterations; i++) {
	execute(expression, false, true)
}
console.timeEnd('[PARSE & EXECUTE] Raw Performance')
clearCache()
console.time('[PARSE & EXECUTE] Default Performance')
for (let i = 0; i < iterations; i++) {
	execute(expression, true, true)
}
console.timeEnd('[PARSE & EXECUTE] Default Performance')

console.log('-- MOLANGJS --')
Molang.cache_enabled = false
console.time('[PARSE & EXECUTE] Raw Performance')
for (let i = 0; i < iterations; i++) {
	Molang.parse(expression, env)
}
console.timeEnd('[PARSE & EXECUTE] Raw Performance')
Molang.cache_enabled = true
console.time('[PARSE & EXECUTE] Default Performance')
for (let i = 0; i < iterations; i++) {
	Molang.parse(expression, env)
}
console.timeEnd('[PARSE & EXECUTE] Default Performance')

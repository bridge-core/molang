import { execute, expressionCache } from '../main'
import { setEnv } from '../env'

const iterations = 10000
const expression =
	"variable.test = 'hello_world'; temp.i = 0; temp.i = temp.i + 10; temp.i = temp.i + 10; temp.i = temp.i + 10; 1 + 1 * 10 + 4;  1 + 1 * 10 + 4; return temp.i;"

function testPerf(
	testName: string,
	useCache: boolean,
	before: () => void,
	after?: () => void
) {
	before()
	console.time(testName)
	for (let i = 0; i < iterations; i++) {
		execute(expression, useCache, true)
	}
	console.timeEnd(testName)

	if (after) setTimeout(after, 200)
}

console.log('-- MOLANG --')
testPerf(
	'[PARSE & EXECUTE] Raw Performance',
	false,
	() => {
		setEnv({
			temp: {},
			variable: {},
		})
	},

	() => {
		testPerf(
			'[PARSE & EXECUTE] Default Performance',
			true,
			() => {
				expressionCache.clear()
			},
			() => {}
		)
	}
)

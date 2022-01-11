import { MoLangMathLib } from './math'
import { standardQueries } from './queries'

export const standardEnv = (useRadians: boolean) => ({
	...MoLangMathLib(useRadians),
	...standardQueries,
})

import { MolangMathLib } from './math'
import { standardQueries } from './queries'

export const standardEnv = (useRadians: boolean) => ({
	...MolangMathLib(useRadians),
	...standardQueries,
})

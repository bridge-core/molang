import pkg from './package.json'
import commonjs from '@rollup/plugin-commonjs'
import typescript from 'rollup-plugin-typescript2'
import { terser } from 'rollup-plugin-terser'
import performanceConfig from './rollup.config.perf'

export default (commandLineArgs) => {
	if (commandLineArgs.configPerf) return performanceConfig

	return {
		input: 'lib/main.ts',
		output: [
			{
				file: pkg.cjs,
				format: 'cjs',
			},
			{
				file: pkg.module,
				format: 'es',
			},
			{
				file: pkg.unpkg,
				format: 'iife',
				name: 'MoLang',
			},
		],
		plugins: [
			typescript({
				typescript: require('typescript'),

				tsconfigOverride: {
					compilerOptions: {
						outDir: 'dist',
						module: 'ESNext',
					},
				},
			}),
			commonjs(),
			terser(),
		],
	}
}

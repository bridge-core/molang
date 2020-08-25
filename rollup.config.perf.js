import pkg from './package.json'
import commonjs from '@rollup/plugin-commonjs'
import typescript from 'rollup-plugin-typescript2'
import { terser } from 'rollup-plugin-terser'

export default {
	input: 'lib/performance/main.ts',
	output: [
		{
			file: pkg.browser.replace('dist', 'perf'),
			format: 'iife',
		},
	],
	plugins: [
		typescript({
			typescript: require('typescript'),

			tsconfigOverride: {
				compilerOptions: {
					outDir: 'dist',
					module: 'ESNext',
					declaration: false,
				},
			},
		}),
		commonjs(),
		terser(),
	],
}

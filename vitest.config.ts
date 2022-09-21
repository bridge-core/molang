import { mergeConfig } from 'vite'
import { defineConfig } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(
	viteConfig,
	defineConfig({
		test: {
			include: ['**/__tests__/**/*.ts'],
			benchmark: {
				include: ['**/__bench__/**/*.ts'],
			},
		},
	})
)

import { sveltekit } from '@sveltejs/kit/vite';
import { svelteTesting } from '@testing-library/svelte/vite';
import { defineConfig } from 'vitest/config';
import { imagetools } from 'vite-imagetools';

export default defineConfig({
	plugins: [sveltekit(), imagetools(), svelteTesting()],
	define: {
		'process.env.VITE_BUILD_TIME': JSON.stringify(new Date().toISOString())
	},
	test: {
		environment: 'jsdom',
		include: ['src/**/*.test.ts'],
		setupFiles: ['src/test/setup.ts']
	}
});

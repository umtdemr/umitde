import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import {imagetools} from "vite-imagetools";

export default defineConfig({
	plugins: [sveltekit(), imagetools()],
	define: {
		'process.env.VITE_BUILD_TIME': JSON.stringify(new Date().toISOString()),
	},
});

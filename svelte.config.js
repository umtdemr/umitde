import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex, escapeSvelte } from "mdsvex";
import { highlight } from './src/lib/shiki/highlight.js';


/** @type {import('mdsvex').MdsvexOptions} */
const mdsvexOptions = {
	extensions: ['.md'],
	highlight: {
		highlighter: async (code, lang) => {
			const html = escapeSvelte(await highlight(code, lang ?? undefined))
			return `{@html \`${html}\` }`
		}
	},
}

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.md'],
	preprocess: [vitePreprocess(), mdsvex(mdsvexOptions)],

	kit: {
		adapter: adapter(),
		// sitemap.xml is not linked from any page, so the crawler needs it as an explicit entry
		prerender: {
			entries: ['*', '/sitemap.xml']
		}
	}
};

export default config;

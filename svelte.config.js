import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex, escapeSvelte } from "mdsvex";
import { createHighlighter } from "shiki";


/** @type {import('mdsvex').MdsvexOptions} */
const mdsvexOptions = {
	extensions: ['.md'],
	highlight: {
		highlighter: async (code, lang = 'text') => {
			const highlighter = await createHighlighter({
				themes: ['github-dark'],
				langs: ['javascript', 'typescript', 'go', 'lua'],
			})
			await highlighter.loadLanguage('javascript', 'typescript', 'go')
			const html = escapeSvelte(highlighter.codeToHtml(code, { lang, theme: 'github-dark' }))
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

import { createHighlighter } from 'shiki';
import { THEME_NAME, theme } from './theme.js';

// one highlighter for the whole build; creating it per code block reloads every grammar
const highlighterPromise = createHighlighter({
	themes: [theme],
	langs: ['javascript', 'typescript', 'go', 'lua']
});

/**
 * @param {string} code
 * @param {string} [lang] fence language; unknown or missing ones render as plain text
 * @returns {Promise<string>}
 */
export async function highlight(code, lang) {
	const highlighter = await highlighterPromise;
	const loaded = highlighter.getLoadedLanguages();
	return highlighter.codeToHtml(code, {
		lang: lang && loaded.includes(lang) ? lang : 'text',
		theme: THEME_NAME
	});
}

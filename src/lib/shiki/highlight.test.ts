import { describe, expect, it } from 'vitest';
import { highlight } from './highlight.js';

const KEYWORD = '#8FA6FF';
const NUMBER_OR_TYPE = '#F2B880';
const STRING = '#9FD49B';
const COMMENT = '#6E6D67';

describe('highlight', () => {
	it('colours js keywords and numbers like the mockup', async () => {
		const html = (await highlight('const x = 1', 'js')).toUpperCase();
		expect(html).toContain(KEYWORD);
		expect(html).toContain(NUMBER_OR_TYPE);
	});

	it('keeps operators in the plain foreground', async () => {
		const html = (await highlight('a = 1', 'js')).toUpperCase();
		expect(html).not.toMatch(new RegExp(`COLOR:${KEYWORD}">\\s*=`));
	});

	it('colours go keywords, types and comments', async () => {
		const html = (
			await highlight('// hi\nfunc f(n int) string { return "x" }', 'go')
		).toUpperCase();
		expect(html).toContain(KEYWORD);
		expect(html).toContain(NUMBER_OR_TYPE);
		expect(html).toContain(STRING);
		expect(html).toContain(COMMENT);
	});

	it('colours lua keywords and strings', async () => {
		const html = (await highlight('local x = "a"', 'lua')).toUpperCase();
		expect(html).toContain(KEYWORD);
		expect(html).toContain(STRING);
	});

	it('falls back to plain text for unknown or missing languages', async () => {
		await expect(highlight('x', 'brainfuck')).resolves.toContain('<pre');
		await expect(highlight('x')).resolves.toContain('<pre');
	});

	it('uses the umitde theme', async () => {
		expect(await highlight('x', 'js')).toContain('shiki umitde');
	});
});

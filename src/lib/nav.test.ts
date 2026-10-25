import { describe, expect, it } from 'vitest';
import { activeSection } from './nav';

describe('activeSection', () => {
	it.each([
		['/', null],
		['/blog/x', 'writing'],
		['/blog/x/', 'writing'],
		['/works', 'works'],
		['/works/', 'works'],
		['/about', 'about'],
		['/aboutness', null],
		['/sitemap.xml', null]
	])('%s → %s', (pathname, expected) => {
		expect(activeSection(pathname)).toBe(expected);
	});
});

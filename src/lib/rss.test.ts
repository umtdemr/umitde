import { describe, expect, it } from 'vitest';
import { renderRss } from './rss';
import type { PostSummary } from './types';

const SITE = 'https://umitde.com';

function post(slug: string, title: string, extra: Partial<PostSummary> = {}): PostSummary {
	return {
		slug,
		title,
		date: '2024-05-18T00:00:00.000Z',
		tag: null,
		readingMinutes: 1,
		...extra
	};
}

describe('renderRss', () => {
	it('escapes XML in titles and descriptions', () => {
		const xml = renderRss([post('a', 'Go & Rust <3', { description: `"quoted" 'single'` })], SITE);
		expect(xml).toContain('<title>Go &amp; Rust &lt;3</title>');
		expect(xml).toContain('<description>&quot;quoted&quot; &apos;single&apos;</description>');
		expect(xml).not.toContain('Rust <3');
	});

	it('renders one item per post', () => {
		const xml = renderRss([post('a', 'A'), post('b', 'B')], SITE);
		expect(xml.match(/<item>/g)).toHaveLength(2);
	});

	it('links and identifies posts by their URL', () => {
		const xml = renderRss([post('a', 'A')], SITE);
		expect(xml).toContain('<link>https://umitde.com/blog/a</link>');
		expect(xml).toContain('<guid isPermaLink="true">https://umitde.com/blog/a</guid>');
	});

	it('uses RFC 822 dates', () => {
		const xml = renderRss([post('a', 'A')], SITE);
		expect(xml).toContain('<pubDate>Sat, 18 May 2024 00:00:00 GMT</pubDate>');
	});

	it('describes the channel and points at itself', () => {
		const xml = renderRss([], SITE);
		expect(xml.startsWith('<?xml version="1.0" encoding="UTF-8"?>')).toBe(true);
		expect(xml).toContain('<title>Ümit Demir</title>');
		expect(xml).toContain('<link>https://umitde.com</link>');
		expect(xml).toContain(
			'<atom:link href="https://umitde.com/rss.xml" rel="self" type="application/rss+xml"/>'
		);
	});
});

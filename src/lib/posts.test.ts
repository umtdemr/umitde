import { afterEach, describe, expect, it } from 'vitest';
import { adjacent, formatDate, groupByYear, readingMinutes, toSummaries } from './posts';
import type { PostMeta, PostSummary } from './types';

describe('formatDate', () => {
	const originalTz = process.env.TZ;
	afterEach(() => {
		process.env.TZ = originalTz;
	});

	it('formats a day', () => {
		expect(formatDate('2024-05-18T00:00:00.000Z', 'day')).toBe('May 18, 2024');
	});

	it('does not shift the day west of UTC', () => {
		process.env.TZ = 'America/Los_Angeles';
		expect(formatDate('2024-05-18T00:00:00.000Z', 'day')).toBe('May 18, 2024');
	});

	it('formats a month', () => {
		expect(formatDate('2026-03-26T00:00:00.000Z', 'month')).toBe('Mar 2026');
	});

	it('formats a month and day with a padded day', () => {
		expect(formatDate('2024-04-06T00:00:00.000Z', 'monthDay')).toBe('Apr 06');
	});
});

describe('readingMinutes', () => {
	it('rounds up at 200 words per minute', () => {
		expect(readingMinutes('word '.repeat(401))).toBe(3);
	});

	it('is at least one minute', () => {
		expect(readingMinutes('')).toBe(1);
	});

	it('ignores frontmatter and script blocks', () => {
		const md = [
			'---',
			'title: ' + 'x '.repeat(500),
			'---',
			'<script>',
			'  import ' + 'y '.repeat(500),
			'</script>',
			'word '.repeat(201)
		].join('\n');
		expect(readingMinutes(md)).toBe(2);
	});
});

function meta(slug: string, date: string, extra: Partial<PostMeta> = {}): PostMeta {
	return { title: slug.toUpperCase(), date, slug, published: true, image: `${slug}.png`, ...extra };
}

describe('toSummaries', () => {
	const modules = {
		'/src/posts/a/a.md': { metadata: meta('a', '2024-04-06', { categories: ['General'] }) },
		'/src/posts/b/b.md': { metadata: meta('b', '2025-11-24', { categories: ['Go'] }) },
		'/src/posts/c/c.md': { metadata: meta('c', '2026-03-26', { published: false }) }
	};
	const raw = {
		'/src/posts/a/a.md': 'word '.repeat(10),
		'/src/posts/b/b.md': 'word '.repeat(450),
		'/src/posts/c/c.md': ''
	};

	it('drops unpublished posts and sorts newest first', () => {
		expect(toSummaries(modules, raw).map((p) => p.slug)).toEqual(['b', 'a']);
	});

	it('normalises dates, lower-cases the tag and counts minutes', () => {
		const [b, a] = toSummaries(modules, raw);
		expect(b).toEqual({
			slug: 'b',
			title: 'B',
			description: undefined,
			date: '2025-11-24T00:00:00.000Z',
			updated: undefined,
			tag: 'go',
			readingMinutes: 3
		});
		expect(a.tag).toBe('general');
	});

	it('has a null tag without categories', () => {
		const only = { '/src/posts/d/d.md': { metadata: meta('d', '2024-01-01') } };
		expect(toSummaries(only, { '/src/posts/d/d.md': '' })[0].tag).toBeNull();
	});
});

describe('adjacent', () => {
	const post = (slug: string): PostSummary => ({
		slug,
		title: slug,
		date: '2024-01-01T00:00:00.000Z',
		tag: null,
		readingMinutes: 1
	});
	const [c, b, a] = [post('c'), post('b'), post('a')];
	const posts = [c, b, a];

	it('links the middle post both ways', () => {
		expect(adjacent(posts, 'b')).toEqual({ older: a, newer: c });
	});

	it('has no newer post for the newest', () => {
		expect(adjacent(posts, 'c')).toEqual({ older: b, newer: null });
	});

	it('has no older post for the oldest', () => {
		expect(adjacent(posts, 'a')).toEqual({ older: null, newer: b });
	});

	it('returns nulls for an unknown slug', () => {
		expect(adjacent(posts, 'nope')).toEqual({ older: null, newer: null });
	});
});

describe('groupByYear', () => {
	const post = (slug: string, date: string): PostSummary => ({
		slug,
		title: slug,
		date,
		tag: null,
		readingMinutes: 1
	});

	it('groups newest-first posts by UTC year, keeping their order', () => {
		const posts = [
			post('c', '2025-11-24T00:00:00.000Z'),
			post('b', '2024-08-26T00:00:00.000Z'),
			post('a', '2024-01-01T00:00:00.000Z')
		];
		expect(groupByYear(posts)).toEqual([
			{ year: '2025', posts: [posts[0]] },
			{ year: '2024', posts: [posts[1], posts[2]] }
		]);
	});

	it('returns no groups for no posts', () => {
		expect(groupByYear([])).toEqual([]);
	});
});

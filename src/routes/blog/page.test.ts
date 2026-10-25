import { render, screen } from '@testing-library/svelte';
import { describe, expect, it, vi } from 'vitest';
import type { PostSummary } from '$lib/types';
import Page from './+page.svelte';

vi.mock('$app/state', () => ({ page: { url: new URL('http://localhost/blog') } }));

const post = (slug: string, title: string, date: string): PostSummary => ({
	slug,
	title,
	date,
	tag: null,
	readingMinutes: 1
});

const posts = [
	post(
		'i-built-a-whiteboard-accidentally',
		'I built a whiteboard, accidentally',
		'2026-03-26T00:00:00.000Z'
	),
	post(
		'handling-dynamic-json-payloads-in-go',
		'Handling Dynamic JSON Payloads in Go',
		'2025-11-24T00:00:00.000Z'
	),
	post('i-switched-to-wezterm', 'I switched to WezTerm', '2024-08-26T00:00:00.000Z'),
	post(
		'canvas-optimization-with-tile-based-caching',
		'Canvas Optimization with Tile Based Caching',
		'2024-05-18T00:00:00.000Z'
	),
	post('a-new-face-a-new-identity', 'A New Face A New Identity', '2024-04-06T00:00:00.000Z')
];

describe('writings page', () => {
	it('has just a title, no intro line', () => {
		const { container } = render(Page, { props: { data: { posts } } as never });
		expect(screen.getByRole('heading', { level: 1 }).textContent).toBe('Writing');
		expect(container.querySelector('main p')).toBeNull();
	});

	it('groups posts under year headings, newest first', () => {
		render(Page, { props: { data: { posts } } as never });
		const years = screen.getAllByRole('heading', { level: 2 }).map((h) => h.textContent);
		expect(years).toEqual(['2026', '2025', '2024']);
	});

	it('links every post with a month-day date', () => {
		render(Page, { props: { data: { posts } } as never });
		const links = screen.getAllByRole('link');
		expect(links.map((a) => a.getAttribute('href'))).toEqual(posts.map((p) => `/blog/${p.slug}`));
		expect(links[0].textContent).toContain('Mar 26');
		expect(links[4].textContent).toContain('Apr 06');
		expect(links[0].querySelector('time')?.getAttribute('datetime')).toBe(posts[0].date);
	});
});

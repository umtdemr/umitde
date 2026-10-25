import { render, screen, within } from '@testing-library/svelte';
import { describe, expect, it, vi } from 'vitest';
import type { PostSummary } from '$lib/types';
import Page from './+page.svelte';

vi.mock('$app/state', () => ({ page: { url: new URL('http://localhost/') } }));

const posts: PostSummary[] = [
	{
		slug: 'i-built-a-whiteboard-accidentally',
		title: 'I built a whiteboard, accidentally',
		date: '2026-03-26T00:00:00.000Z',
		tag: 'general',
		readingMinutes: 3
	},
	{
		slug: 'handling-dynamic-json-payloads-in-go',
		title: 'Handling Dynamic JSON Payloads in Go',
		date: '2025-11-24T00:00:00.000Z',
		tag: 'go',
		readingMinutes: 5
	}
];

function renderHome() {
	// the page only reads data.posts; the rest of PageData is not used
	return render(Page, { props: { data: { posts } } as never });
}

describe('home page', () => {
	it('introduces me', () => {
		renderHome();
		expect(screen.getByRole('heading', { level: 1 }).textContent).toBe("Hi, I'm Ümit.");
	});

	it('lists posts with month dates', () => {
		const { container } = renderHome();
		const writing = container.querySelector('#writing') as HTMLElement;
		expect(writing).not.toBeNull();

		const links = within(writing).getAllByRole('link');
		expect(links.map((a) => a.getAttribute('href'))).toEqual([
			'/blog/i-built-a-whiteboard-accidentally',
			'/blog/handling-dynamic-json-payloads-in-go'
		]);
		expect(links[0].textContent).toContain('Mar 2026');
		expect(links[0].querySelector('time')?.getAttribute('datetime')).toBe(posts[0].date);
	});

	it('lists the featured works', () => {
		renderHome();
		const works = screen.getByRole('region', { name: 'works' });
		const links = within(works).getAllByRole('link');
		expect(links.map((a) => a.getAttribute('href'))).toEqual([
			'https://eskiz.io',
			'/works#spor-istanbul-cli',
			'/works#person-alarm'
		]);
		expect(links[0].textContent).toContain('— a Go backend that became a whiteboard');
	});
});

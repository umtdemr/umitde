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

function renderHome(list: PostSummary[] = posts) {
	// the page only reads data.posts; the rest of PageData is not used
	return render(Page, { props: { data: { posts: list } } as never });
}

const itemLinks = (section: HTMLElement) =>
	within(section)
		.getAllByRole('link')
		.filter((a) => !a.textContent?.startsWith('all '));

describe('home page', () => {
	it('introduces me', () => {
		renderHome();
		expect(screen.getByRole('heading', { level: 1 }).textContent).toBe("Hi, I'm Ümit.");
	});

	it('lists posts with month dates', () => {
		const { container } = renderHome();
		const writing = container.querySelector('#writing') as HTMLElement;
		expect(writing).not.toBeNull();

		const links = itemLinks(writing);
		expect(links.map((a) => a.getAttribute('href'))).toEqual([
			'/blog/i-built-a-whiteboard-accidentally',
			'/blog/handling-dynamic-json-payloads-in-go'
		]);
		expect(links[0].textContent).toContain('Mar 2026');
		expect(links[0].querySelector('time')?.getAttribute('datetime')).toBe(posts[0].date);
	});

	it('links every featured work to its card on the works page', () => {
		renderHome();
		const works = screen.getByRole('region', { name: 'works' });
		const links = itemLinks(works);
		expect(links.map((a) => a.getAttribute('href'))).toEqual([
			'/works#eskiz',
			'/works#spor-istanbul-cli',
			'/works#person-alarm'
		]);
		expect(links[0].textContent).toContain('— a Go backend that became a whiteboard');
	});

	it('links each section heading to its full page', () => {
		renderHome();
		expect(screen.getByRole('link', { name: 'all writings →' }).getAttribute('href')).toBe('/blog');
		expect(screen.getByRole('link', { name: 'all works →' }).getAttribute('href')).toBe('/works');
	});

	it('shows only the latest five posts', () => {
		const many = Array.from({ length: 7 }, (_, i) => ({
			...posts[0],
			slug: `post-${i}`,
			title: `Post ${i}`
		}));
		const { container } = renderHome(many);
		const links = itemLinks(container.querySelector('#writing') as HTMLElement);
		expect(links.map((a) => a.getAttribute('href'))).toEqual(
			['post-0', 'post-1', 'post-2', 'post-3', 'post-4'].map((slug) => `/blog/${slug}`)
		);
	});
});

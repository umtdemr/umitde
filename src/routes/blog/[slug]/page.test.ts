import { render, screen } from '@testing-library/svelte';
import { describe, expect, it, vi } from 'vitest';
import type { PostSummary } from '$lib/types';
import Stub from '../../../test/Stub.svelte';
import Page from './+page.svelte';

vi.mock('$app/state', () => ({
	page: { url: new URL('http://localhost/blog/canvas-optimization-with-tile-based-caching') }
}));

const canvas: PostSummary = {
	slug: 'canvas-optimization-with-tile-based-caching',
	title: 'Canvas Optimization with Tile Based Caching',
	description: 'Enhancing canvas performance with tile based caching.',
	date: '2024-05-18T00:00:00.000Z',
	tag: 'engineering',
	readingMinutes: 3
};
const wezterm: PostSummary = {
	slug: 'i-switched-to-wezterm',
	title: 'I switched to WezTerm',
	date: '2024-08-26T00:00:00.000Z',
	tag: 'general',
	readingMinutes: 6
};
const newFace: PostSummary = {
	slug: 'a-new-face-a-new-identity',
	title: 'A New Face A New Identity',
	date: '2024-04-06T00:00:00.000Z',
	tag: null,
	readingMinutes: 2
};
const imageData = { src: '/img.png', alt: 'alt text' };

function renderPost(post: PostSummary, older: PostSummary | null, newer: PostSummary | null) {
	const data = { post, older, newer, content: Stub, imageData };
	return render(Page, { props: { data } as never });
}

describe('post page', () => {
	it('shows the meta line and title', () => {
		const { container } = renderPost(canvas, null, wezterm);
		expect(container.querySelector('.meta')?.textContent).toBe(
			'May 18, 2024 · engineering · 3 min'
		);
		expect(container.querySelector('.meta time')?.getAttribute('datetime')).toBe(canvas.date);
		expect(screen.getByRole('heading', { level: 1 }).textContent).toBe(canvas.title);
	});

	it('drops the tag from the meta line when there is none', () => {
		const { container } = renderPost(newFace, null, null);
		expect(container.querySelector('.meta')?.textContent).toBe('Apr 6, 2024 · 2 min');
	});

	it('renders the post content', () => {
		renderPost(canvas, null, wezterm);
		expect(screen.getByText('stub content')).toBeTruthy();
	});

	it('links only the newer post when there is no older one', () => {
		renderPost(canvas, null, wezterm);
		const nav = screen.getByRole('navigation', { name: 'Post navigation' });
		expect(nav.textContent).not.toContain('← older');
		const newer = screen.getByRole('link', { name: /newer →/ });
		expect(newer.getAttribute('href')).toBe('/blog/i-switched-to-wezterm');
		expect(newer.textContent).toContain('I switched to WezTerm');
	});

	it('links both neighbours', () => {
		renderPost(canvas, newFace, wezterm);
		expect(screen.getByRole('link', { name: /← older/ }).getAttribute('href')).toBe(
			'/blog/a-new-face-a-new-identity'
		);
		expect(screen.getByRole('link', { name: /newer →/ }).getAttribute('href')).toBe(
			'/blog/i-switched-to-wezterm'
		);
	});
});

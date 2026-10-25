import { render, screen } from '@testing-library/svelte';
import { describe, expect, it, vi } from 'vitest';
import journey from './journey.json';
import Page from './+page.svelte';

vi.mock('$app/state', () => ({ page: { url: new URL('http://localhost/about') } }));

describe('about page', () => {
	it('has the title and the contact link', () => {
		render(Page);
		expect(screen.getByRole('heading', { level: 1 }).textContent).toBe('About');
		expect(screen.getByRole('link', { name: 'umitde296@gmail.com' }).getAttribute('href')).toBe(
			'mailto:umitde296@gmail.com'
		);
	});

	it('lists every journey year and entry', () => {
		const { container } = render(Page);
		const years = [...container.querySelectorAll('.year')].map((el) => el.textContent);
		expect(years).toEqual(journey.data.map((group) => group.year));
		for (const entry of journey.data.flatMap((group) => group.content)) {
			expect(screen.getByText(entry.title)).toBeTruthy();
			expect(screen.getByText(entry.desc)).toBeTruthy();
		}
	});
});

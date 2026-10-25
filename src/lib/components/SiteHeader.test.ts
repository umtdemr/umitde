import { render, screen } from '@testing-library/svelte';
import { describe, expect, it, vi } from 'vitest';
import SiteHeader from './SiteHeader.svelte';

vi.mock('$app/state', () => ({ page: { url: new URL('http://localhost/blog') } }));

describe('SiteHeader', () => {
	it('links writing to the writings page and marks it current there', () => {
		render(SiteHeader);
		const writing = screen.getByRole('link', { name: 'writing' });
		expect(writing.getAttribute('href')).toBe('/blog');
		expect(writing.getAttribute('aria-current')).toBe('page');
		expect(screen.getByRole('link', { name: 'works' }).getAttribute('aria-current')).toBeNull();
	});
});

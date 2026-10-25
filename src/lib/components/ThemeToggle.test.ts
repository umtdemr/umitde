import { fireEvent, render, screen } from '@testing-library/svelte';
import { tick } from 'svelte';
import { describe, expect, it, vi } from 'vitest';
import { mockMatchMedia } from '../../test/matchMedia';
import ThemeToggle from './ThemeToggle.svelte';

const DARK_QUERY = '(prefers-color-scheme: dark)';

async function setup(theme: 'light' | 'dark') {
	document.documentElement.dataset.theme = theme;
	render(ThemeToggle);
	await tick();
	return screen.getByRole('button');
}

describe('ThemeToggle', () => {
	it('labels by current theme', async () => {
		const button = await setup('dark');
		expect(button.getAttribute('aria-label')).toBe('Switch to light theme');
	});

	it('labels light theme', async () => {
		const button = await setup('light');
		expect(button.getAttribute('aria-label')).toBe('Switch to dark theme');
	});

	it('click toggles and persists', async () => {
		const button = await setup('light');
		await fireEvent.click(button);
		expect(document.documentElement.dataset.theme).toBe('dark');
		expect(localStorage.getItem('theme')).toBe('dark');
		expect(button.getAttribute('aria-label')).toBe('Switch to light theme');
	});

	it('still toggles when storage throws', async () => {
		vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
			throw new DOMException('blocked');
		});
		const button = await setup('light');
		await fireEvent.click(button);
		expect(document.documentElement.dataset.theme).toBe('dark');
	});

	it('follows OS until the user picks', async () => {
		const media = mockMatchMedia({ [DARK_QUERY]: false });
		const button = await setup('light');

		media.set(DARK_QUERY, true);
		await tick();
		expect(document.documentElement.dataset.theme).toBe('dark');
		expect(localStorage.getItem('theme')).toBeNull();

		await fireEvent.click(button);
		expect(document.documentElement.dataset.theme).toBe('light');

		media.set(DARK_QUERY, true);
		media.set(DARK_QUERY, false);
		media.set(DARK_QUERY, true);
		await tick();
		expect(document.documentElement.dataset.theme).toBe('light');
	});

	it('ignores OS changes when a choice is stored', async () => {
		localStorage.setItem('theme', 'light');
		const media = mockMatchMedia({ [DARK_QUERY]: false });
		await setup('light');
		media.set(DARK_QUERY, true);
		await tick();
		expect(document.documentElement.dataset.theme).toBe('light');
	});
});

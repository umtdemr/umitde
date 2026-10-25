import { act, fireEvent, render, screen } from '@testing-library/svelte';
import { createRawSnippet } from 'svelte';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const motion = vi.hoisted(() => ({ reducedMotion: { current: false } }));
vi.mock('./reducedMotion', () => motion);

import SporCli from './SporCli.svelte';

const info = createRawSnippet(() => ({ render: () => '<p>spor info</p>' }));

function setup() {
	const result = render(SporCli, { info });
	const play = () => screen.queryByRole('button', { name: /^Run/ });
	const text = () =>
		result.container.querySelector('.tui')?.textContent?.replace(/\s+/g, ' ') ?? '';
	const status = () => result.container.querySelector('[aria-live]')?.textContent?.trim();
	return { ...result, play, text, status };
}

async function advance(ms: number) {
	await act(() => vi.advanceTimersByTime(ms));
}

describe('SporCli', () => {
	beforeEach(() => {
		vi.useFakeTimers();
		motion.reducedMotion.current = false;
	});
	afterEach(() => {
		vi.useRealTimers();
	});

	it('waits at a shell prompt', () => {
		const { text } = setup();
		expect(text()).toContain('~/spor-istanbul');
		expect(text()).toContain('$ ./main');
		expect(screen.getByText('spor info')).toBeTruthy();
		expect(screen.getByRole('button', { name: 'Run the CLI' })).toBeTruthy();
		expect(screen.queryByRole('button', { name: 'run it' })).toBeNull();
	});

	it('types the login, then picks a subscription', async () => {
		const { play, text, status } = setup();
		await fireEvent.click(play()!);
		expect(text()).toContain('Login');
		expect(status()).toBe('Logging in');

		await advance(1499);
		expect(text()).toContain('umit');
		expect(text()).toContain('••••••');

		await advance(1);
		expect(text()).toContain('Select a subscription');
		expect(text()).toContain('17');
		expect(text()).toContain('City Gym · Fitness');
		expect(status()).toBe('Selecting a subscription');
	});

	it('walks the session grid and picks the Saturday morning slot', async () => {
		const { play, text, container } = setup();
		await fireEvent.click(play()!);
		await advance(2600);
		expect(text()).toContain('Select a session');
		expect(text()).toMatch(/Saturday.*Sunday.*Monday/);
		const cells = () => [...container.querySelectorAll('[data-cell]')];
		expect(cells()).toHaveLength(6);
		expect(cells().filter((cell) => cell.textContent?.includes('Full'))).toHaveLength(5);
		const cursor = () => cells().findIndex((cell) => cell.hasAttribute('data-cursor'));
		expect(cursor()).toBe(0);
		await advance(400);
		expect(cursor()).toBe(3);
		await advance(400);
		expect(cursor()).toBe(0);
	});

	it('keeps checking, then rings the alarm', async () => {
		const { play, text, status } = setup();
		await fireEvent.click(play()!);
		await advance(4000);
		expect(text()).toContain('Checking an empty spot');
		expect(text()).toContain('Session Date: 25.05.2024 Saturday');
		expect(text()).toContain('1 times checked so far');
		expect(play()).toBeNull();

		await advance(3600);
		expect(text()).toContain('7 times checked so far');

		await advance(100);
		expect(text()).toContain('Found an empty spot!');
		expect(text()).toContain('♪ playing the alarm');
		expect(status()).toBe('Found an empty spot. The alarm is ringing.');
		expect(screen.getByRole('button', { name: 'Run the CLI again' })).toBeTruthy();
	});

	it('spins the spinner, unless motion is reduced', async () => {
		const { play, container } = setup();
		const spinner = () => container.querySelector('[data-spinner]')?.textContent;
		await fireEvent.click(play()!);
		await advance(4000);
		expect(spinner()).toBe('|');
		await advance(150);
		expect(spinner()).toBe('/');

		motion.reducedMotion.current = true;
		await advance(150);
		expect(spinner()).toBe('/');
	});

	it('hides the play button while running and restarts afterwards', async () => {
		const { play, text } = setup();
		await fireEvent.click(play()!);
		await advance(2000);
		expect(play()).toBeNull();
		await advance(600);
		expect(text()).toContain('Select a session');

		await advance(6000);
		expect(text()).toContain('Found an empty spot!');
		await fireEvent.click(play()!);
		expect(text()).toContain('Login');
		expect(text()).not.toContain('umit');
	});

	it('cancels its timers when unmounted mid-run', async () => {
		const { play, unmount } = setup();
		await fireEvent.click(play()!);
		await advance(1000);
		unmount();
		expect(vi.getTimerCount()).toBe(0);
	});
});

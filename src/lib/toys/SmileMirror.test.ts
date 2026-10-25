import { act, fireEvent, render, screen } from '@testing-library/svelte';
import { createRawSnippet } from 'svelte';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const motion = vi.hoisted(() => ({ reducedMotion: { current: false } }));
vi.mock('./reducedMotion', () => motion);

import SmileMirror from './SmileMirror.svelte';

const info = createRawSnippet(() => ({ render: () => '<p>mirror info</p>' }));

function setup() {
	const result = render(SmileMirror, { info });
	const button = screen.getByRole('button', { name: 'smile' });
	const face = () => screen.getByRole('img').getAttribute('aria-label');
	const counter = () => result.container.querySelector('[data-counter]')?.textContent?.trim();
	const shots = () => result.container.querySelectorAll('[data-shot]').length;
	const flash = () => (result.container.querySelector('[data-flash]') as HTMLElement).style.opacity;
	const detection = () => result.container.querySelector('[data-detection]');
	return { ...result, button, face, counter, shots, flash, detection };
}

async function advance(ms: number) {
	await act(() => vi.advanceTimersByTime(ms));
}

describe('SmileMirror', () => {
	beforeEach(() => {
		vi.useFakeTimers();
		motion.reducedMotion.current = false;
	});
	afterEach(() => {
		vi.useRealTimers();
	});

	it('starts with a neutral face and no selfies', () => {
		const { face, counter, shots, flash, detection, button } = setup();
		expect(face()).toBe('Neutral face in the mirror');
		expect(counter()).toBe('0 selfies');
		expect(shots()).toBe(0);
		expect(flash()).toBe('0');
		expect(detection()).toBeNull();
		expect(button.getAttribute('aria-disabled')).toBe('false');
		expect(screen.getByText('mirror info')).toBeTruthy();
	});

	it('keeps the smile button inside the stage, like the robot poses', () => {
		const { button, container } = setup();
		expect(container.querySelector('.toy-stage')?.contains(button)).toBe(true);
		expect(container.querySelector('.actions')).toBeNull();
	});

	it('smiles, detects, flashes and takes a selfie', async () => {
		const { button, face, counter, shots, flash, detection } = setup();
		await fireEvent.click(button);
		expect(face()).toBe('Smiling face in the mirror');
		expect(detection()).not.toBeNull();
		expect(button.getAttribute('aria-disabled')).toBe('true');

		await advance(549);
		expect(counter()).toBe('0 selfies');
		await advance(1);
		expect(counter()).toBe('1 selfie');
		expect(shots()).toBe(1);
		expect(flash()).toBe('0.85');

		await advance(250);
		expect(flash()).toBe('0');

		await advance(900);
		expect(face()).toBe('Neutral face in the mirror');
		expect(detection()).toBeNull();
		expect(button.getAttribute('aria-disabled')).toBe('false');
	});

	it('ignores clicks while already smiling', async () => {
		const { button, counter } = setup();
		await fireEvent.click(button);
		await advance(300);
		await fireEvent.click(button);
		await advance(2000);
		expect(counter()).toBe('1 selfie');
	});

	it('prints the whole smiling face on each selfie', async () => {
		const { button, container } = setup();
		await fireEvent.click(button);
		await advance(550);
		const shot = container.querySelector('[data-shot]') as HTMLElement;
		expect(shot.querySelector('svg circle[r="30"]')).not.toBeNull();
		expect(shot.querySelectorAll('svg circle[r="2.8"]')).toHaveLength(2);
		expect(shot.querySelector('svg path')?.getAttribute('d')).toBe('M46 80 Q60 94 74 80');
	});

	it('shows at most three thumbnails', async () => {
		const { button, counter, shots } = setup();
		for (let i = 0; i < 5; i++) {
			await fireEvent.click(button);
			await advance(1700);
		}
		expect(counter()).toBe('5 selfies');
		expect(shots()).toBe(3);
	});

	it('skips the flash when motion is reduced, but still counts', async () => {
		motion.reducedMotion.current = true;
		const { button, counter, flash } = setup();
		await fireEvent.click(button);
		await advance(600);
		expect(flash()).toBe('0');
		expect(counter()).toBe('1 selfie');
	});

	it('cancels its timers when unmounted mid-smile', async () => {
		const { button, unmount } = setup();
		await fireEvent.click(button);
		await advance(600);
		unmount();
		expect(vi.getTimerCount()).toBe(0);
	});
});

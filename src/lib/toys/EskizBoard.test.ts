import { fireEvent, render, screen } from '@testing-library/svelte';
import { createRawSnippet } from 'svelte';
import { describe, expect, it, vi } from 'vitest';
import EskizBoard from './EskizBoard.svelte';

const info = createRawSnippet(() => ({ render: () => '<p>eskiz info</p>' }));

function setup() {
	const result = render(EskizBoard, { info });
	const board = screen.getByRole('group', { name: 'Sticky note board' });
	vi.spyOn(board, 'getBoundingClientRect').mockReturnValue({
		left: 0,
		top: 0,
		width: 200,
		height: 100
	} as DOMRect);
	const notes = () => [...result.container.querySelectorAll<HTMLElement>('[data-note]')];
	const toolbar = () => screen.queryByRole('toolbar', { name: 'Note colour' });
	return { board, notes, toolbar, container: result.container };
}

// first note starts at x 24%, y 42% → (48px, 42px) on the 200×100 board
async function drag(note: HTMLElement, from: [number, number], to: [number, number]) {
	await fireEvent.pointerDown(note, { pointerId: 1, clientX: from[0], clientY: from[1] });
	await fireEvent.pointerMove(note, { pointerId: 1, clientX: to[0], clientY: to[1] });
	await fireEvent.pointerUp(note, { pointerId: 1, clientX: to[0], clientY: to[1] });
}

describe('EskizBoard', () => {
	it('starts with three unselected notes and no colour bar', () => {
		const { notes, toolbar } = setup();
		expect(notes()).toHaveLength(3);
		expect(notes().map((n) => n.getAttribute('aria-pressed'))).toEqual(['false', 'false', 'false']);
		expect(toolbar()).toBeNull();
		expect(screen.getByText('drag a note · click to recolor')).toBeTruthy();
		expect(screen.getByText('eskiz info')).toBeTruthy();
		expect(screen.queryByRole('button', { name: 'clear board' })).toBeNull();
	});

	it('moves a dragged note by the pointer delta and tilts it on drop', async () => {
		const { notes } = setup();
		vi.spyOn(Math, 'random').mockReturnValue(0);
		await drag(notes()[0], [48, 42], [88, 52]);
		expect(notes()[0].style.left).toBe('44%');
		expect(notes()[0].style.top).toBe('52%');
		expect(notes()[0].style.transform).toContain('rotate(-5deg)');
	});

	it('treats a tiny move as a click: selects without moving or tilting', async () => {
		const { notes, toolbar } = setup();
		const before = notes()[0].style.transform;
		await drag(notes()[0], [48, 42], [49, 43]);
		expect(notes()[0].style.left).toBe('24%');
		expect(notes()[0].style.transform).toBe(before);
		expect(notes()[0].getAttribute('aria-pressed')).toBe('true');
		expect(toolbar()).not.toBeNull();
	});

	it('keeps dragged notes inside the board', async () => {
		const { notes } = setup();
		await drag(notes()[0], [48, 42], [1000, -1000]);
		expect(notes()[0].style.left).toBe('95%');
		expect(notes()[0].style.top).toBe('5%');
	});

	it('recolours the selected note from the colour bar', async () => {
		const { notes } = setup();
		await fireEvent.click(notes()[0]);
		const blue = screen.getByRole('button', { name: 'Blue' });
		await fireEvent.click(blue);
		expect(notes()[0].style.background).toBe('rgb(191, 211, 255)');
		expect(notes()[0].getAttribute('aria-label')).toBe('Blue note');
		expect(blue.getAttribute('aria-pressed')).toBe('true');
		expect(screen.getByRole('button', { name: 'Yellow' }).getAttribute('aria-pressed')).toBe(
			'false'
		);
	});

	it('moves the focused note with arrow keys and deselects with Escape', async () => {
		const { notes, toolbar } = setup();
		const note = notes()[0];
		await fireEvent.keyDown(note, { key: 'ArrowRight' });
		expect(note.style.left).toBe('26%');
		await fireEvent.keyDown(note, { key: 'ArrowDown', shiftKey: true });
		expect(note.style.top).toBe('52%');
		expect(note.getAttribute('aria-pressed')).toBe('true');
		await fireEvent.keyDown(note, { key: 'Escape' });
		expect(note.getAttribute('aria-pressed')).toBe('false');
		expect(toolbar()).toBeNull();
	});

	it('deselects when the empty board is pressed', async () => {
		const { board, notes, toolbar } = setup();
		await fireEvent.click(notes()[1]);
		expect(toolbar()).not.toBeNull();
		await fireEvent.pointerDown(board, { pointerId: 1, clientX: 5, clientY: 5 });
		expect(toolbar()).toBeNull();
		expect(notes()[1].getAttribute('aria-pressed')).toBe('false');
	});

	it('connects the first two notes with an arrow that follows them', async () => {
		const { notes, container } = setup();
		const arrow = () => container.querySelector('[data-connector]');
		const line = () => arrow()?.querySelector('line');
		expect(arrow()).not.toBeNull();
		const x1Before = line()?.getAttribute('x1');

		await drag(notes()[0], [48, 42], [28, 42]);
		expect(line()?.getAttribute('x1')).not.toBe(x1Before);

		// drop the first note on top of the second: no room for an arrow
		await drag(notes()[0], [28, 42], [92, 62]);
		expect(arrow()).toBeNull();
	});

	it('selects a note from the keyboard (Enter/Space click)', async () => {
		const { notes } = setup();
		await fireEvent.click(notes()[2], { detail: 0 });
		expect(notes()[2].getAttribute('aria-pressed')).toBe('true');
		expect(notes()[0].getAttribute('aria-pressed')).toBe('false');
	});
});

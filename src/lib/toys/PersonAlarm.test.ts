import { fireEvent, render, screen } from '@testing-library/svelte';
import { createRawSnippet } from 'svelte';
import { act } from '@testing-library/svelte';
import { afterEach, describe, expect, it, vi } from 'vitest';
import PersonAlarm from './PersonAlarm.svelte';

const info = createRawSnippet(() => ({ render: () => '<p>alarm info</p>' }));

function setup() {
	const result = render(PersonAlarm, { info });
	const slider = screen.getByLabelText('Walk the person') as HTMLInputElement;
	const hint = () => screen.queryByText('drag the person');
	const distance = () => result.container.querySelector('[data-distance]')?.textContent;
	const status = () => screen.getByRole('status').textContent?.replace(/\s+/g, ' ').trim();
	const alarm = () => screen.queryByText('● ALARM');
	const box = () => result.container.querySelector('[data-person]') as HTMLElement;
	const walk = (value: number) => fireEvent.input(slider, { target: { value: String(value) } });
	const toastShown = () => screen.getByRole('status').classList.contains('show');
	return { ...result, slider, hint, distance, status, alarm, box, walk, toastShown };
}

describe('PersonAlarm', () => {
	afterEach(() => {
		vi.useRealTimers();
	});

	it('starts far from the zone with no message', () => {
		const { slider, hint, distance, status, alarm } = setup();
		expect(slider.value).toBe('72');
		expect(slider.min).toBe('28');
		expect(slider.max).toBe('90');
		expect(distance()).toBe('d=176');
		expect(status()).toBe('');
		expect(alarm()).toBeNull();
		expect(screen.getByText('alarm info')).toBeTruthy();
		expect(hint()).not.toBeNull();
		expect(slider.getAttribute('aria-valuetext')).toBe('176 units from the danger zone');
	});

	it('has no control row under the frame, so the title lines up with the other cards', () => {
		const { container } = setup();
		const topLevel = [...container.children].map((el) => el.tagName + '.' + el.className);
		expect(topLevel.some((name) => name.includes('control'))).toBe(false);
		expect(container.querySelector('.camera input[type="range"]')).not.toBeNull();
	});

	it('hides the hint once the person has moved', async () => {
		const { hint, walk } = setup();
		await walk(60);
		expect(hint()).toBeNull();
	});

	it('stays quiet while the person walks outside the limit', async () => {
		const { distance, status, alarm, walk, toastShown } = setup();
		await walk(60);
		expect(distance()).toBe('d=128');
		expect(status()).toBe('');
		expect(toastShown()).toBe(false);
		expect(alarm()).toBeNull();
	});

	it('raises the alarm below the distance limit', async () => {
		const { distance, status, alarm, box, walk } = setup();
		await walk(42);
		expect(distance()).toBe('d=56');
		expect(status()).toContain('Person Alarm');
		expect(status()).toContain('limit exceeded');
		expect(alarm()).not.toBeNull();
		expect(box().classList.contains('alarm')).toBe(true);
	});

	it('treats exactly the limit as safe', async () => {
		const { distance, status, alarm, box, walk } = setup();
		await walk(43);
		expect(distance()).toBe('d=60');
		expect(status()).toBe('');
		expect(alarm()).toBeNull();
		expect(box().classList.contains('alarm')).toBe(false);
	});

	it('clears the alarm when the person walks away again', async () => {
		const { alarm, status, walk, toastShown } = setup();
		await walk(30);
		expect(alarm()).not.toBeNull();
		await walk(80);
		expect(alarm()).toBeNull();
		expect(status()).toBe('');
		expect(toastShown()).toBe(false);
	});

	it('reaches zero at the edge of the zone', async () => {
		const { distance, walk } = setup();
		await walk(28);
		expect(distance()).toBe('d=0');
	});

	it('hides the notification after 3s without moving, and shows it again on the next move', async () => {
		vi.useFakeTimers();
		const { walk, toastShown, alarm } = setup();
		await walk(40);
		expect(toastShown()).toBe(true);
		await act(() => vi.advanceTimersByTime(2000));
		await walk(41);
		await act(() => vi.advanceTimersByTime(2999));
		expect(toastShown()).toBe(true);
		await act(() => vi.advanceTimersByTime(1));
		expect(toastShown()).toBe(false);
		// the alarm itself stays on screen
		expect(alarm()).not.toBeNull();
		await walk(42);
		expect(toastShown()).toBe(true);
	});

	it('cancels the hide timer when unmounted', async () => {
		vi.useFakeTimers();
		const { walk, unmount } = setup();
		await walk(50);
		unmount();
		expect(vi.getTimerCount()).toBe(0);
	});
});

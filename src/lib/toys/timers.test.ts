import { render } from '@testing-library/svelte';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import TimerProbe from './__fixtures__/TimerProbe.svelte';

describe('useTimers', () => {
	beforeEach(() => {
		vi.useFakeTimers();
	});
	afterEach(() => {
		vi.useRealTimers();
	});

	it('runs a scheduled callback once', () => {
		const cb = vi.fn();
		render(TimerProbe, { cb, ms: 1000 });
		vi.advanceTimersByTime(999);
		expect(cb).not.toHaveBeenCalled();
		vi.advanceTimersByTime(1);
		expect(cb).toHaveBeenCalledTimes(1);
	});

	it('cancels pending callbacks when the component is destroyed', () => {
		const cb = vi.fn();
		const { unmount } = render(TimerProbe, { cb, ms: 1000 });
		vi.advanceTimersByTime(500);
		unmount();
		expect(vi.getTimerCount()).toBe(0);
		vi.advanceTimersByTime(1000);
		expect(cb).not.toHaveBeenCalled();
	});

	it('clear() cancels everything still pending', () => {
		const cb = vi.fn();
		render(TimerProbe, { cb, ms: 1000, clearAt: 500 });
		vi.advanceTimersByTime(2000);
		expect(cb).not.toHaveBeenCalled();
		expect(vi.getTimerCount()).toBe(0);
	});
});

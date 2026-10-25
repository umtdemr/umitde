import { render, screen } from '@testing-library/svelte';
import { createRawSnippet } from 'svelte';
import { afterEach, describe, expect, it, vi } from 'vitest';
import LazyToy from './LazyToy.svelte';

vi.mock('./registry', () => ({
	toyLoaders: { tiles: () => import('./__fixtures__/Loaded.svelte') }
}));

const info = createRawSnippet(() => ({ render: () => '<p>info text</p>' }));

type Callback = (entries: Partial<IntersectionObserverEntry>[]) => void;

function stubIntersectionObserver() {
	const observers: {
		callback: Callback;
		options?: IntersectionObserverInit;
		disconnect: () => void;
	}[] = [];
	class FakeObserver {
		disconnect = vi.fn();
		observe = vi.fn();
		unobserve = vi.fn();
		constructor(callback: Callback, options?: IntersectionObserverInit) {
			observers.push({ callback, options, disconnect: this.disconnect });
		}
	}
	vi.stubGlobal('IntersectionObserver', FakeObserver);
	return observers;
}

describe('LazyToy', () => {
	afterEach(() => {
		vi.unstubAllGlobals();
	});

	it('shows the placeholder and info until the toy scrolls near', async () => {
		const observers = stubIntersectionObserver();
		const { container } = render(LazyToy, { name: 'tiles', aspect: '4 / 3', info });

		expect(screen.queryByText('loaded')).toBeNull();
		expect(screen.getByText('info text')).toBeTruthy();
		const placeholder = container.querySelector('.toy-stage') as HTMLElement;
		expect(placeholder.style.aspectRatio).toBe('4 / 3');
		expect(observers).toHaveLength(1);
		expect(observers[0].options?.rootMargin).toBe('200px');

		observers[0].callback([{ isIntersecting: false }]);
		await Promise.resolve();
		expect(screen.queryByText('loaded')).toBeNull();

		observers[0].callback([{ isIntersecting: true }]);
		expect(await screen.findByText('loaded')).toBeTruthy();
		expect(observers[0].disconnect).toHaveBeenCalled();
		expect(screen.getByText('info text')).toBeTruthy();
		expect(container.querySelector('.toy-stage')).toBeNull();
	});

	it('loads right away without IntersectionObserver', async () => {
		vi.stubGlobal('IntersectionObserver', undefined);
		render(LazyToy, { name: 'tiles', info });
		expect(await screen.findByText('loaded')).toBeTruthy();
	});

	it('stays a placeholder when no toy is registered', async () => {
		vi.stubGlobal('IntersectionObserver', undefined);
		const { container } = render(LazyToy, { name: 'eskiz', info });
		await new Promise((resolve) => setTimeout(resolve, 0));
		expect(screen.queryByText('loaded')).toBeNull();
		expect(container.querySelector('.toy-stage')).not.toBeNull();
	});
});

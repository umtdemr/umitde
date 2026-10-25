import { onDestroy } from 'svelte';

/**
 * setTimeout that is cancelled when the calling component is destroyed.
 * Call during component init, like any lifecycle function.
 */
export function useTimers() {
	const pending = new Set<ReturnType<typeof setTimeout>>();

	function clear() {
		for (const id of pending) clearTimeout(id);
		pending.clear();
	}

	function later(fn: () => void, ms: number) {
		const id = setTimeout(() => {
			pending.delete(id);
			fn();
		}, ms);
		pending.add(id);
	}

	onDestroy(clear);

	return { later, clear };
}

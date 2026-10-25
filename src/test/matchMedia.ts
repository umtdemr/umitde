type Listener = (event: MediaQueryListEvent) => void;

/**
 * Replaces window.matchMedia with a controllable fake.
 * `set` flips a query and notifies its change listeners, like the OS would.
 */
export function mockMatchMedia(matches: Record<string, boolean>) {
	const state = { ...matches };
	const listeners = new Map<string, Set<Listener>>();

	window.matchMedia = (query: string) => {
		const set = listeners.get(query) ?? new Set<Listener>();
		listeners.set(query, set);
		const mql = {
			media: query,
			get matches() {
				return state[query] ?? false;
			},
			onchange: null,
			addEventListener: (_type: string, fn: Listener) => set.add(fn),
			removeEventListener: (_type: string, fn: Listener) => set.delete(fn),
			addListener: (fn: Listener) => set.add(fn),
			removeListener: (fn: Listener) => set.delete(fn),
			dispatchEvent: () => true
		};
		return mql as unknown as MediaQueryList;
	};

	return {
		set(query: string, value: boolean) {
			state[query] = value;
			for (const fn of listeners.get(query) ?? []) {
				fn({ matches: value, media: query } as MediaQueryListEvent);
			}
		}
	};
}

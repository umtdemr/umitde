// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}

	// defined by the Google Analytics snippet in src/lib/analytics.svelte
	interface Window {
		gtag?: (...args: unknown[]) => void;
	}
}

export {};

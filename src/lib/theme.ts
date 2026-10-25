export type Theme = 'light' | 'dark';

// keep in sync with the inline script in src/app.html
export const THEME_KEY = 'theme';

const DARK_QUERY = '(prefers-color-scheme: dark)';

export function readTheme(): Theme {
	return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
}

export function applyTheme(theme: Theme, persist: boolean): void {
	document.documentElement.dataset.theme = theme;
	if (!persist) return;
	try {
		localStorage.setItem(THEME_KEY, theme);
	} catch {
		// storage can be blocked (private mode, disabled site data); the theme still applies for this visit
	}
}

export function hasStoredTheme(): boolean {
	try {
		const stored = localStorage.getItem(THEME_KEY);
		return stored === 'light' || stored === 'dark';
	} catch {
		return false;
	}
}

export function watchSystemTheme(cb: (theme: Theme) => void): () => void {
	const mql = matchMedia(DARK_QUERY);
	const onChange = (event: MediaQueryListEvent) => cb(event.matches ? 'dark' : 'light');
	mql.addEventListener('change', onChange);
	return () => mql.removeEventListener('change', onChange);
}

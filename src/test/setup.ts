import { afterEach, vi } from 'vitest';
import { mockMatchMedia } from './matchMedia';

mockMatchMedia({});

afterEach(() => {
	vi.restoreAllMocks();
	localStorage.clear();
	delete document.documentElement.dataset.theme;
	mockMatchMedia({});
});

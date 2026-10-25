import { render, screen } from '@testing-library/svelte';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import ErrorPage from './+error.svelte';

const state = vi.hoisted(() => ({
	page: {
		url: new URL('http://localhost/nope'),
		status: 404,
		error: { message: 'Not Found' } as { message: string } | null
	}
}));

vi.mock('$app/state', () => state);

describe('error page', () => {
	beforeEach(() => {
		state.page.status = 404;
		state.page.error = { message: 'Not Found' };
	});

	it('shows the status and a friendly 404 message', () => {
		render(ErrorPage);
		expect(screen.getByRole('heading', { level: 1 }).textContent).toBe('404');
		expect(screen.getByText('Page not found')).toBeTruthy();
		expect(screen.getByRole('link', { name: '← home' }).getAttribute('href')).toBe('/');
	});

	it('shows the error message for other statuses', () => {
		state.page.status = 500;
		state.page.error = { message: 'Internal Error' };
		render(ErrorPage);
		expect(screen.getByRole('heading', { level: 1 }).textContent).toBe('500');
		expect(screen.getByText('Internal Error')).toBeTruthy();
	});
});

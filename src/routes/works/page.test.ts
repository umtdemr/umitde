import { render, screen, within } from '@testing-library/svelte';
import { describe, expect, it, vi } from 'vitest';
import Page from './+page.svelte';

vi.mock('$app/state', () => ({ page: { url: new URL('http://localhost/works') } }));

describe('works page', () => {
	it('renders only the playable cards, in order', () => {
		const { container } = render(Page);
		const cards = [...container.querySelectorAll('.cards > article')];
		expect(cards.map((card) => card.id)).toEqual([
			'eskiz',
			'spor-istanbul-cli',
			'person-alarm',
			'mimic-robot',
			'smile-mirror'
		]);
		expect(cards[0].classList.contains('span')).toBe(true);
		expect(cards.slice(1).some((card) => card.classList.contains('span'))).toBe(false);
	});

	it('shows project text before the toys load', () => {
		render(Page);
		expect(screen.getByText('Smile Mirror')).toBeTruthy();
		expect(
			screen.getByText('A mirror that takes a selfie when you smile. C++ and OpenCV.')
		).toBeTruthy();
	});

	it('links external projects with an arrow', () => {
		render(Page);
		const eskiz = screen.getByRole('link', { name: 'eskiz.io ↗' });
		expect(eskiz.getAttribute('href')).toBe('https://eskiz.io');
	});

	it('has no image cards: Apeiros moved to "also"', () => {
		const { container } = render(Page);
		expect(container.querySelector('#apeiros')).toBeNull();
		expect(container.querySelector('.cards img')).toBeNull();
	});

	it('lists the rest under "also"', () => {
		render(Page);
		const also = screen.getByRole('region', { name: 'also' });
		const items = [...also.querySelectorAll('.more > *')];
		expect(items.map((item) => item.querySelector('.name')?.textContent)).toEqual([
			'Apeiros',
			'Hierapi',
			'Petra Coffee',
			'umitde.com'
		]);
		expect(items[1].tagName).toBe('DIV');
		expect(within(also).getByRole('link').getAttribute('href')).toBe('/');
		expect(items[1].textContent).toContain(
			'Multi-language e-commerce, my first freelance job. Vue · Django'
		);
	});
});

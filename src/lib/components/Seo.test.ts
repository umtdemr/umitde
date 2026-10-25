import { render } from '@testing-library/svelte';
import { afterEach, describe, expect, it, vi } from 'vitest';
import Seo from './Seo.svelte';

vi.mock('$app/state', () => ({ page: { url: new URL('http://sveltekit-prerender/blog/x') } }));
vi.mock('$lib/config/website', () => ({
	default: { siteTitle: 'Ümit Demir', siteUrl: 'https://umitde.com' }
}));

const meta = (key: string) =>
	document.head
		.querySelector(`meta[property="${key}"], meta[name="${key}"]`)
		?.getAttribute('content');

describe('Seo', () => {
	afterEach(() => {
		document.head.innerHTML = '';
	});

	it('uses the real site URL for canonical and og:url, never the prerender origin', () => {
		render(Seo, { title: 'Post', description: 'About it' });
		const canonical = document.head.querySelector('link[rel="canonical"]');
		expect(canonical?.getAttribute('href')).toBe('https://umitde.com/blog/x');
		expect(meta('og:url')).toBe('https://umitde.com/blog/x');
		expect(document.head.innerHTML).not.toContain('sveltekit-prerender');
	});

	it('writes open graph tags as properties', () => {
		render(Seo, { title: 'Post', description: 'About it' });
		expect(document.title).toBe('Post');
		expect(document.head.querySelector('meta[property="og:description"]')).not.toBeNull();
		expect(document.head.querySelector('meta[name="og:description"]')).toBeNull();
		expect(meta('description')).toBe('About it');
		expect(meta('og:type')).toBe('website');
	});

	it('falls back to the default image, as an absolute URL', () => {
		render(Seo, { title: 'Post', description: 'About it' });
		expect(meta('og:image')).toMatch(/^https:\/\/umitde\.com\//);
		expect(meta('twitter:image')).toBe(meta('og:image'));
		expect(meta('twitter:card')).toBe('summary_large_image');
	});

	it('makes a given image absolute and keeps its size and alt', () => {
		render(Seo, {
			title: 'Post',
			description: 'About it',
			type: 'article',
			image: { src: '/_app/immutable/assets/cover.png', width: 760, height: 367, alt: 'cover' }
		});
		expect(meta('og:image')).toBe('https://umitde.com/_app/immutable/assets/cover.png');
		expect(meta('og:image:width')).toBe('760');
		expect(meta('og:image:height')).toBe('367');
		expect(meta('og:image:alt')).toBe('cover');
		expect(meta('og:type')).toBe('article');
	});

	it('adds article times and BlogPosting structured data for an article', () => {
		render(Seo, {
			title: 'Post - Ümit Demir',
			description: 'About </script> it',
			type: 'article',
			article: { headline: 'Post', published: '2024-01-01T00:00:00.000Z' }
		});
		expect(meta('article:published_time')).toBe('2024-01-01T00:00:00.000Z');
		expect(meta('article:modified_time')).toBe('2024-01-01T00:00:00.000Z');
		const script = document.head.querySelector('script[type="application/ld+json"]');
		expect(script?.textContent).not.toContain('</script>');
		const data = JSON.parse(script?.textContent ?? '');
		expect(data).toMatchObject({
			'@type': 'BlogPosting',
			headline: 'Post',
			description: 'About </script> it',
			mainEntityOfPage: 'https://umitde.com/blog/x'
		});
	});

	it('has no structured data without an article', () => {
		render(Seo, { title: 'Post', description: 'About it' });
		expect(document.head.querySelector('script[type="application/ld+json"]')).toBeNull();
	});

	it('does not name a twitter account', () => {
		render(Seo, { title: 'Post', description: 'About it' });
		expect(meta('twitter:site')).toBeUndefined();
		expect(meta('twitter:creator')).toBeUndefined();
	});
});

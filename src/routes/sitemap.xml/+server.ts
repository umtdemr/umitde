import website from '$lib/config/website';
import { getPosts } from '$lib/posts.server';
import type { RequestHandler } from './$types';

// endpoints don't inherit prerender from +layout.ts
export const prerender = true;

type Entry = { path: string; lastmod?: string };

const render = (entries: Entry[]) => `<?xml version="1.0" encoding="UTF-8" ?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
	.map(
		({ path, lastmod }) => `	<url>
		<loc>${website.siteUrl}${path}</loc>${lastmod ? `\n\t\t<lastmod>${lastmod}</lastmod>` : ''}
	</url>`
	)
	.join('\n')}
</urlset>`;

export const GET: RequestHandler = () => {
	const posts = getPosts();
	const postEntries = posts.map((post) => ({
		path: `/blog/${post.slug}`,
		lastmod: post.updated ?? post.date
	}));
	// the home page and /blog list posts, so they change when a post does
	const newest = postEntries.reduce<string | undefined>(
		(latest, { lastmod }) => (latest && latest > lastmod ? latest : lastmod),
		undefined
	);

	// static pages get no lastmod: a build timestamp would change on every deploy and teach crawlers to ignore it
	const entries: Entry[] = [
		{ path: '', lastmod: newest },
		{ path: '/blog', lastmod: newest },
		{ path: '/about' },
		{ path: '/works' },
		...postEntries
	];

	return new Response(render(entries), {
		headers: { 'content-type': 'application/xml; charset=utf-8' }
	});
};

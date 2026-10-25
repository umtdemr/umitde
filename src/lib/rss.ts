import type { PostSummary } from './types';

const ENTITIES: Record<string, string> = {
	'&': '&amp;',
	'<': '&lt;',
	'>': '&gt;',
	'"': '&quot;',
	"'": '&apos;'
};

function escapeXml(text: string): string {
	return text.replace(/[&<>"']/g, (char) => ENTITIES[char]);
}

function renderItem(post: PostSummary, siteUrl: string): string {
	const url = `${siteUrl}/blog/${post.slug}`;
	return `
		<item>
			<title>${escapeXml(post.title)}</title>
			<link>${url}</link>
			<guid isPermaLink="true">${url}</guid>
			<pubDate>${new Date(post.date).toUTCString()}</pubDate>
			<description>${escapeXml(post.description ?? '')}</description>
		</item>`;
}

/** RSS 2.0 feed of the given posts, newest first as passed in. */
export function renderRss(posts: PostSummary[], siteUrl: string): string {
	return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
	<channel>
		<title>Ümit Demir</title>
		<link>${siteUrl}</link>
		<description>Notes on Go, canvas and embedded systems.</description>
		<language>en-us</language>
		<atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml"/>${posts
			.map((post) => renderItem(post, siteUrl))
			.join('')}
	</channel>
</rss>
`;
}

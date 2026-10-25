import website from '$lib/config/website';
import { getPosts } from '$lib/posts.server';
import { renderRss } from '$lib/rss';
import type { RequestHandler } from './$types';

// endpoints don't inherit prerender from +layout.ts
export const prerender = true;

export const GET: RequestHandler = () =>
	new Response(renderRss(getPosts(), website.siteUrl), {
		headers: { 'content-type': 'application/rss+xml; charset=utf-8' }
	});

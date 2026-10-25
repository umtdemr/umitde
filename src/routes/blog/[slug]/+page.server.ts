import { error } from '@sveltejs/kit';
import { adjacent } from '$lib/posts';
import { getPosts } from '$lib/posts.server';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = ({ params }) => {
	const posts = getPosts();
	const post = posts.find((p) => p.slug === params.slug);
	if (!post) error(404, 'Post not found');
	return { post, ...adjacent(posts, post.slug) };
};

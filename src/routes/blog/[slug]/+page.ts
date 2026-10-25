import type { Component } from 'svelte';
import type { ImageData } from '$lib/types';
import type { PageLoad } from './$types';

// the post component can't be serialised, so it is imported here and merged with the server data
export const load: PageLoad = async ({ params, data }) => {
	const post: { default: Component } = await import(
		`../../../posts/${params.slug}/${params.slug}.md`
	);
	const image: { default: ImageData & { alt: string } } = await import(
		`../../../lib/generated/posts/${params.slug}/${params.slug}.ts`
	);
	return { ...data, content: post.default, imageData: image.default };
};

import { getPosts } from '$lib/posts.server';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = () => ({ posts: getPosts() });

import type {PostWithPath} from "$lib/types";

// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
export const prerender = true;

export async function load({fetch}) {
    const response = await fetch('api/posts');
    const posts: PostWithPath[] = await response.json()
    return {
        posts
    }
}
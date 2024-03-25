// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
import type {Post} from "$lib/types";

export const prerender = true;

export async function load({fetch}) {
    const response = await fetch('api/posts');
    const posts: Post[] = await response.json()
    return {
        posts
    }
}
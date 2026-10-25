import type {PostWithPath} from "$lib/types";

export async function load({fetch}) {
    const response = await fetch('api/posts');
    const posts: PostWithPath[] = await response.json()
    return {
        posts
    }
}
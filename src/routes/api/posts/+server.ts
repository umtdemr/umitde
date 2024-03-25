import {json} from "@sveltejs/kit";
import type {Post} from "$lib/types";

async function getPosts() {
    const posts: any[] = [];
    const paths = import.meta.glob('/src/posts/*.md', {
        eager: true
    });

    for (const path in paths) {
        const file = paths[path];
        if (file && typeof file === 'object' && 'metadata' in file) {
            const metadata = file.metadata as Post;
            if (metadata.published) {
                posts.push(metadata);
            }
        }
    }

    posts.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    )

    return posts
}

export async function GET() {
    const posts = await getPosts();
    return json(posts);
}
import {json} from "@sveltejs/kit";
import type {Post, PostWithPath} from "$lib/types";

async function getPosts() {
    const posts: PostWithPath[] = [];
    const paths = import.meta.glob('/src/posts/*/*.md', {
        eager: true
    });

    for (const path in paths) {
        const file = paths[path];
        if (!file || typeof file !== 'object'|| !('metadata' in file)) {
            continue;
        }
        const metadata = file.metadata as Post;
        if (!metadata.published) {
            continue;
        }

        const postDate = new Date(metadata.date);
        metadata.date = postDate.toISOString()
        const strDateOptions: Intl.DateTimeFormatOptions = {
            month: 'short',
            year: 'numeric',
            day: '2-digit'
        }
        metadata.strDate = postDate.toLocaleDateString('en-US', strDateOptions)
        const postPath = path.substring(0, path.lastIndexOf('/'))
        posts.push({...metadata, path: postPath });
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
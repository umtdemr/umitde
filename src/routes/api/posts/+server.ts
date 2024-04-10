import {json} from "@sveltejs/kit";
import type {Post, PostWithPath} from "$lib/types";

async function getPosts(query?: string) {
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
        if (query) {
            const lowerCaseQuery = query.toLowerCase();
            const content = file.default.render().html;
            let plainTextContent = content.replace(/<\/?[^>]+(>|$)/g, "");
            plainTextContent = plainTextContent.replace(/[\*\_\`\#\>\-\+\[\]\!\(\)]/g, "");

            let includesQuery = false;

            if (
                metadata.title.toLowerCase().includes(lowerCaseQuery) ||
                metadata.description?.toLowerCase().includes(lowerCaseQuery) ||
                plainTextContent.toLowerCase().includes(lowerCaseQuery)
            ) {
                includesQuery = true;
            }

            if (!includesQuery) {
                continue;
            }
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
        const imageData = await import(`../../../lib/generated/posts/${metadata.slug}/${metadata.slug}.ts`);

        posts.push({...metadata, path: postPath, imageData: imageData.default });
    }

    posts.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    )

    return posts
}

export async function GET(event: any) {
    const searchQuery = event?.url?.searchParams?.get('s');
    const posts = await getPosts(searchQuery);
    return json(posts);
}
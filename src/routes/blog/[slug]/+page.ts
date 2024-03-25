export async function load({ params }) {
    const post = await import(`../../../posts/${params.slug}/${params.slug}.md`);

    return {
        content: post.default,
        metadata: post.metadata
    }
}

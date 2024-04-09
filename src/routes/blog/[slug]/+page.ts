export async function load({ params }) {
    const post = await import(`../../../posts/${params.slug}/${params.slug}.md`);
    const imageData = await import(`../../../lib/generated/posts/${post.metadata.slug}/${post.metadata.slug}.ts`);

    return {
        content: post.default,
        metadata: { ...post.metadata, imageData: imageData.default }
    }
}

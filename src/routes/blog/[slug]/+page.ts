export async function load({ params }) {
    const post = await import(`../../../posts/${params.slug}/${params.slug}.md`);
    const imageData = await import(`../../../lib/generated/posts/${post.metadata.slug}/${post.metadata.slug}.ts`);
    const postDate = new Date(post.metadata.date);
    post.metadata.date = postDate.toISOString()
    const strDateOptions: Intl.DateTimeFormatOptions = {
        month: 'short',
        year: 'numeric',
        day: '2-digit'
    }
    post.metadata.strDate = postDate.toLocaleDateString('en-US', strDateOptions)


    return {
        content: post.default,
        metadata: { ...post.metadata, imageData: imageData.default }
    }
}

export async function load() {
    const data = await import('./portfolioData.json');

    // Load all images in parallel without blocking
    const itemsPromise = Promise.all(
        data.items.map(async (item) => {
            const imagePromises = item.images.map(async (image) => {
                const imageData = await import(`../../lib/generated/works/${image.slug}.ts`);
                return { ...image, imageData: imageData.default };
            });
            
            return {
                ...item,
                images: await Promise.all(imagePromises)
            };
        })
    );

    return {
        items: itemsPromise
    }
}
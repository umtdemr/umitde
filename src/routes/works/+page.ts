export async function load() {
    const data = await import('./portfolioData.json');
    const works = [];

    for (const item of data.items) {
        const work = {...item};
        for (let i = 0; i < item.images.length; i++) {
            const image = item.images[i]
            const imageData = await import(`../../lib/generated/works/${image.slug}.ts`);
            item.images[i].imageData = imageData.default;
        }
    }

    return {
        ...data
    }
}
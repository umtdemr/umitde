import fm from "front-matter"
import fs from "fs";
import path from 'path';
import {makeDirectory} from "./src/lib/utils/file.js";
import {metadata, dominantColour, lowResolutionPlaceholder} from "./src/lib/utils/image.js";
const BLOG_PATH = 'src/posts'
const PORTFOLIO_PATH = 'src/routes/works/portfolioData.json';

const __dirname = path.resolve();
const formats = ['avif', 'webp', 'auto'];
const sizes = [760];
const portfolioSizes = [548];
const densities = [1.0];
const maxWidth = sizes[sizes.length - 1];
const maxPortfolioImageWidth = sizes[sizes.length - 1];

// use sizes and densities arrays to determine the actual output widths needed
const outputSizes = [];
const portfolioOutputSizes = [];
sizes.forEach((sizesElement) => {
    densities.forEach((densitiesElement) => outputSizes.push(densitiesElement * sizesElement));
});
outputSizes.sort((a, b) => b - a);

portfolioSizes.forEach((sizesElement) => {
    densities.forEach((densitiesElement) => portfolioOutputSizes.push(densitiesElement * sizesElement));
});
portfolioOutputSizes.sort((a, b) => b - a);

async function generateImageMeta(source) {
    const metaPromises = [
        metadata({ source }),
        dominantColour({ source }),
        lowResolutionPlaceholder({ source }),
    ];
    const [metadataResult, dominantColourObject, placeholder] = await Promise.all(metaPromises);
    const { format, width, height } = metadataResult;
    const { r, g, b } = dominantColourObject;
    const dominantColourValue = `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`;
    return { dominantColour: dominantColourValue, placeholder, format, width, height };
}

async function getPostImages(location) {
    const directories = fs
        .readdirSync(location)
        .filter((element) => fs.lstatSync(`${location}/${element}`).isDirectory());

    const images = [];

    for (const directory of directories) {
        const contentPath = `${location}/${directory}/${directory}.md`;
        if (!fs.existsSync(contentPath)) {
            continue;
        }

        const content = fs.readFileSync(contentPath, { encoding: 'utf-8' });
        const fmContent = fm(content);

        const {
            image,
            imageAlt: alt
        } = fmContent.attributes;

        images.push({
            image,
            slug: directory,
            alt,
            contentImages: fmContent.attributes.postImages
        })
    }
    return images;
}

async function generatePostImages() {
    const location = path.join(__dirname, BLOG_PATH);
    const postImages = await getPostImages(location);

    const imageMetaPromises = postImages.map(async (element) => {
        const { image, slug } = element;
        const source = path.join(__dirname, 'src/lib/assets/blog/', slug, image);
        return generateImageMeta(source);
    });
    const imageMetadata = await Promise.all(imageMetaPromises);

    const contentImageMetaPromises = [];
    for (const postImage of postImages) {
        if (!postImage.contentImages) {
            continue
        }
        const { slug } = postImage
        for (const contentImage of postImage.contentImages) {
            if (!contentImage) {
                continue
            }
            const { image } = contentImage;
            const source = path.join(__dirname, 'src/lib/assets/blog/', slug, image);
            contentImageMetaPromises.push(generateImageMeta(source));
        }
    }

    const contentImageMetaData = await Promise.all(contentImageMetaPromises);

    const imageGeneratedDir =  path.join(__dirname, 'src/lib/generated/posts');
    await makeDirectory(imageGeneratedDir);

    let contentImageIndex = 0;
    for (let index in postImages) {
        const postImage = postImages[index];
        const { image, slug, alt } = postImage;
        const { dominantColour, format, placeholder, width } = imageMetadata[index];
        const postDirectory = path.join(imageGeneratedDir, slug);
        const postPath = path.join(postDirectory, `${slug}.ts`);

        const generatePath = (image, width, slug, alt, placeholder, dominantColour, format, renderSlug = null) => {
            renderSlug = renderSlug ? renderSlug : slug;
            const source = `$lib/assets/blog/${slug}/${image}`
            const srcsetImportArray = formats.map(
                (formatsElement) =>
                    `import srcset${formatsElement} from '${source}?w=${
                        width < outputSizes[0] ? `${width};` : ''
                    }${outputSizes
                        .filter((outputSizesElement) => outputSizesElement <= width)
                        .join(';')}&format=${formatsElement === 'auto' ? format : formatsElement}&as=srcset';`,
            );
            const sources = `[\n${formats
                .map(
                    (formatsElement) =>
                        `    { srcset: ${`srcset${formatsElement}`}, type: ${
                            formatsElement === 'auto' ? `'image/${format}'` : `'image/${formatsElement}'`
                        } },`,
                )
                .join('\n')}\n  ]`;
            return `import meta from '${source}?w=${Math.min(
                maxWidth,
                width,
            )}&as=meta:height;src;width';
${srcsetImportArray.join('\n')}
const { height, src, width } = meta;

const data = {
  slug: '${renderSlug}',
  width,
  height,
  src,
  alt: '${alt}',
  sources: ${sources},
  dominantColour: '${dominantColour}',
  placeholder:
    '${placeholder}',
};

export { data as default };
`;
        }
        const result = generatePath(image, width, slug, alt, placeholder, dominantColour, format);

        await makeDirectory(postDirectory)
        fs.writeFileSync(postPath, result, 'utf-8');

        for (const contentImage of postImage.contentImages ) {
            const { image, slug: contentImgSlug, alt } = contentImage;
            const { dominantColour, format, placeholder, width } = contentImageMetaData[contentImageIndex];
            const contentImagePath = path.join(postDirectory, `${contentImgSlug}.ts`);
            const result = generatePath(image, width, slug, alt, placeholder, dominantColour, format, contentImgSlug);
            fs.writeFileSync(contentImagePath, result, 'utf-8');
            contentImageIndex++;
        }
    }

}

async function generatePortfolioImages() {
    const location = path.join(__dirname, PORTFOLIO_PATH);
    const file = fs.readFileSync(location, { encoding: 'utf-8' })
    const data = JSON.parse(file);
    const images = data.items.map(item => item.images).flat()

    const imageMetaPromises = images.map(async (element) => {
        const { url } = element;
        const source = path.join(__dirname, 'src/lib/assets/works/', url);
        return generateImageMeta(source);
    });
    const imageMetadata = await Promise.all(imageMetaPromises);

    const imageGeneratedDir =  path.join(__dirname, 'src/lib/generated/works');
    await makeDirectory(imageGeneratedDir);

    images.forEach((portfolioImage, index) => {
        const { url, slug, alt } = portfolioImage;
        const { dominantColour, format, placeholder, width } = imageMetadata[index];
        const postPath = path.join(imageGeneratedDir, `${slug}.ts`);

        const source = `$lib/assets/works/${url}`
        const srcsetImportArray = formats.map(
            (formatsElement) =>
                `import srcset${formatsElement} from '${source}?w=${
                    width < portfolioOutputSizes[0] ? `${width};` : ''
                }${portfolioOutputSizes
                    .filter((outputSizesElement) => outputSizesElement <= width)
                    .join(';')}&format=${formatsElement === 'auto' ? format : formatsElement}&as=srcset';`,
        );
        const sources = `[\n${formats
            .map(
                (formatsElement) =>
                    `    { srcset: ${`srcset${formatsElement}`}, type: ${
                        formatsElement === 'auto' ? `'image/${format}'` : `'image/${formatsElement}'`
                    } },`,
            )
            .join('\n')}\n  ]`;
        const result = `import meta from '${source}?w=${Math.min(
            maxWidth,
            width,
        )}&as=meta:height;src;width';
${srcsetImportArray.join('\n')}
const { height, src, width } = meta;

const data = {
  slug: '${slug}',
  width,
  height,
  alt: '${alt}',
  src,
  sources: ${sources},
  dominantColour: '${dominantColour}',
  placeholder:
    '${placeholder}',
};

export { data as default };
`;
        fs.writeFileSync(postPath, result, 'utf-8');

    });

}

async function main() {
    const promises = [generatePortfolioImages(), generatePostImages()]
    await Promise.allSettled(promises)
}

await main();
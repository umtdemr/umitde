import fm from "front-matter"
import fs from "fs";
import path from 'path';
import {makeDirectory} from "./src/lib/utils/file.js";
import {metadata, dominantColour, lowResolutionPlaceholder} from "./src/lib/utils/image.js";
const BLOG_PATH = 'src/posts'

const __dirname = path.resolve();
const formats = ['avif', 'webp', 'auto'];
const sizes = [760];
const densities = [1.0];
const maxWidth = sizes[sizes.length - 1];

// use sizes and densities arrays to determine the actual output widths needed
const outputSizes = [];
sizes.forEach((sizesElement) => {
    densities.forEach((densitiesElement) => outputSizes.push(densitiesElement * sizesElement));
});
outputSizes.sort((a, b) => b - a);

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
            image
        } = fmContent.attributes;

        images.push({
            image,
            slug: directory
        })
    }
    return images;
}

async function main() {
    const location = path.join(__dirname, BLOG_PATH);
    const postImages = await getPostImages(location);

    const imageMetaPromises = postImages.map(async (element) => {
        const { image, slug } = element;
        const source = path.join(__dirname, 'src/lib/assets/blog/', slug, image);
        return generateImageMeta(source);
    });
    const imageMetadata = await Promise.all(imageMetaPromises);

    const imageGeneratedDir =  path.join(__dirname, 'src/lib/generated/posts');
    await makeDirectory(imageGeneratedDir);
    postImages.forEach((postImage, index) => {
        const { image, slug } = postImage;
        const { dominantColour, format, placeholder, width } = imageMetadata[index];
        const postPath = path.join(imageGeneratedDir, `${slug}.ts`);

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

main()
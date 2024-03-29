import meta from '$lib/assets/blog/first-post/post_mockup_featured_image.png?w=760&as=meta:height;src;width';
import srcsetavif from '$lib/assets/blog/first-post/post_mockup_featured_image.png?w=760&format=avif&as=srcset';
import srcsetwebp from '$lib/assets/blog/first-post/post_mockup_featured_image.png?w=760&format=webp&as=srcset';
import srcsetauto from '$lib/assets/blog/first-post/post_mockup_featured_image.png?w=760&format=png&as=srcset';
const { height, src, width } = meta;

const data = {
  slug: 'first-post',
  width,
  height,
  src,
  sources: [
    { srcset: srcsetavif, type: 'image/avif' },
    { srcset: srcsetwebp, type: 'image/webp' },
    { srcset: srcsetauto, type: 'image/png' },
  ],
  dominantColour: '#888',
  placeholder:
    'data:image/jpeg;base64,/9j/2wBDAAwREhMUFBUUFBofGhUaHiIcGhohKC4jJB4hMzg/PTouKC5CRFpMPi5XRTc3VmBRVlpgZmRkQklveXFmeFtlaWf/2wBDAQgMDQwNDw8PDxFgEBIaVmBaYFpgY2NjY2BjYGBiY2NjY2NjY2NjY2NjY2JjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wgARCAAFAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAUG/8QAFQEBAQAAAAAAAAAAAAAAAAAAAQL/2gAMAwEAAhADEAAAAMrKG//EABwQAAICAgMAAAAAAAAAAAAAAAECAwQAEhEhQf/aAAgBAQABPwChcavRmVFG0j6b+quPMGZmZeSSSe8//8QAFxEAAwEAAAAAAAAAAAAAAAAAAAECIf/aAAgBAgEBPwB3U4mf/8QAFxEAAwEAAAAAAAAAAAAAAAAAAAECIf/aAAgBAwEBPwBTL1n/2Q==',
};

export { data as default };

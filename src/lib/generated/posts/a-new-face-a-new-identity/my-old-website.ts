import meta from '$lib/assets/blog/a-new-face-a-new-identity/my-old-website.png?w=760&as=meta:height;src;width';
import srcsetavif from '$lib/assets/blog/a-new-face-a-new-identity/my-old-website.png?w=760&format=avif&as=srcset';
import srcsetwebp from '$lib/assets/blog/a-new-face-a-new-identity/my-old-website.png?w=760&format=webp&as=srcset';
import srcsetauto from '$lib/assets/blog/a-new-face-a-new-identity/my-old-website.png?w=760&format=png&as=srcset';
const { height, src, width } = meta;

const data = {
  slug: 'my-old-website',
  width,
  height,
  src,
  alt: 'my old website home page',
  sources: [
    { srcset: srcsetavif, type: 'image/avif' },
    { srcset: srcsetwebp, type: 'image/webp' },
    { srcset: srcsetauto, type: 'image/png' },
  ],
  dominantColour: '#f8f8f8',
  placeholder:
    'data:image/jpeg;base64,/9j/2wBDAAwREhMUFBUUFBofGhUaHiIcGhohKC4jJB4hMzg/PTouKC5CRFpMPi5XRTc3VmBRVlpgZmRkQklveXFmeFtlaWf/2wBDAQgMDQwNDw8PDxFgEBIaVmBaYFpgY2NjY2BjYGBiY2NjY2NjY2NjY2NjY2JjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wgARCAAHAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAMH/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEAMQAAAA024f/8QAGhAAAgIDAAAAAAAAAAAAAAAAAREDEDFBQv/aAAgBAQABPwBSNcrOwa//xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oACAECAQE/AH//xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oACAEDAQE/AH//2Q==',
};

export { data as default };

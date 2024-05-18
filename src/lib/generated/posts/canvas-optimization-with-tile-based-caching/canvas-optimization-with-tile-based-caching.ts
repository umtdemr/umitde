import meta from '$lib/assets/blog/canvas-optimization-with-tile-based-caching/canvas-optimization-with-tile-based-caching.png?w=760&as=meta:height;src;width';
import srcsetavif from '$lib/assets/blog/canvas-optimization-with-tile-based-caching/canvas-optimization-with-tile-based-caching.png?w=760&format=avif&as=srcset';
import srcsetwebp from '$lib/assets/blog/canvas-optimization-with-tile-based-caching/canvas-optimization-with-tile-based-caching.png?w=760&format=webp&as=srcset';
import srcsetauto from '$lib/assets/blog/canvas-optimization-with-tile-based-caching/canvas-optimization-with-tile-based-caching.png?w=760&format=png&as=srcset';
const { height, src, width } = meta;

const data = {
  slug: 'canvas-optimization-with-tile-based-caching',
  width,
  height,
  src,
  alt: 'A tile based caching example. The objects are cached with tiles.',
  sources: [
    { srcset: srcsetavif, type: 'image/avif' },
    { srcset: srcsetwebp, type: 'image/webp' },
    { srcset: srcsetauto, type: 'image/png' },
  ],
  dominantColour: '#f8f8f8',
  placeholder:
    'data:image/jpeg;base64,/9j/2wBDAAwREhMUFBUUFBofGhUaHiIcGhohKC4jJB4hMzg/PTouKC5CRFpMPi5XRTc3VmBRVlpgZmRkQklveXFmeFtlaWf/2wBDAQgMDQwNDw8PDxFgEBIaVmBaYFpgY2NjY2BjYGBiY2NjY2NjY2NjY2NjY2JjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wgARCAAFAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAEG/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEAMQAAAA3tD/xAAXEAADAQAAAAAAAAAAAAAAAAAAE2Kh/9oACAEBAAE/AHzo+dP/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oACAECAQE/AH//xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oACAEDAQE/AH//2Q==',
};

export { data as default };

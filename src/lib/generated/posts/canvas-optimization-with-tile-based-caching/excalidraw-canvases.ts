import meta from '$lib/assets/blog/canvas-optimization-with-tile-based-caching/excalidraw-canvases.png?w=760&as=meta:height;src;width';
import srcsetavif from '$lib/assets/blog/canvas-optimization-with-tile-based-caching/excalidraw-canvases.png?w=760&format=avif&as=srcset';
import srcsetwebp from '$lib/assets/blog/canvas-optimization-with-tile-based-caching/excalidraw-canvases.png?w=760&format=webp&as=srcset';
import srcsetauto from '$lib/assets/blog/canvas-optimization-with-tile-based-caching/excalidraw-canvases.png?w=760&format=png&as=srcset';
const { height, src, width } = meta;

const data = {
  slug: 'excalidraw-canvases',
  width,
  height,
  src,
  alt: 'The graphics tab of safari developer tools when Excalidraw is opened',
  sources: [
    { srcset: srcsetavif, type: 'image/avif' },
    { srcset: srcsetwebp, type: 'image/webp' },
    { srcset: srcsetauto, type: 'image/png' },
  ],
  dominantColour: '#383838',
  placeholder:
    'data:image/jpeg;base64,/9j/2wBDAAwREhMUFBUUFBofGhUaHiIcGhohKC4jJB4hMzg/PTouKC5CRFpMPi5XRTc3VmBRVlpgZmRkQklveXFmeFtlaWf/2wBDAQgMDQwNDw8PDxFgEBIaVmBaYFpgY2NjY2BjYGBiY2NjY2NjY2NjY2NjY2JjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wgARCAAGAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAMG/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEAMQAAAAx8w//8QAFRABAQAAAAAAAAAAAAAAAAAAAAH/2gAIAQEAAT8AV//EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQIBAT8Af//EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQMBAT8Af//Z',
};

export { data as default };

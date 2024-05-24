import meta from '$lib/assets/works/spor-istanbul-cli-1.png?w=548&as=meta:height;src;width';
import srcsetavif from '$lib/assets/works/spor-istanbul-cli-1.png?w=548&format=avif&as=srcset';
import srcsetwebp from '$lib/assets/works/spor-istanbul-cli-1.png?w=548&format=webp&as=srcset';
import srcsetauto from '$lib/assets/works/spor-istanbul-cli-1.png?w=548&format=png&as=srcset';
const { height, src, width } = meta;

const data = {
  slug: 'spor-istanbul-cli-1',
  width,
  height,
  alt: 'Spor Istanbul CLI auth screen',
  src,
  sources: [
    { srcset: srcsetavif, type: 'image/avif' },
    { srcset: srcsetwebp, type: 'image/webp' },
    { srcset: srcsetauto, type: 'image/png' },
  ],
  dominantColour: '#81828',
  placeholder:
    'data:image/jpeg;base64,/9j/2wBDAAwREhMUFBUUFBofGhUaHiIcGhohKC4jJB4hMzg/PTouKC5CRFpMPi5XRTc3VmBRVlpgZmRkQklveXFmeFtlaWf/2wBDAQgMDQwNDw8PDxFgEBIaVmBaYFpgY2NjY2BjYGBiY2NjY2NjY2NjY2NjY2JjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wgARCAALAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAQf/xAAUAQEAAAAAAAAAAAAAAAAAAAAE/9oADAMBAAIQAxAAAACbotH/AP/EABUQAQEAAAAAAAAAAAAAAAAAABEg/9oACAEBAAE/AGP/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oACAECAQE/AH//xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oACAEDAQE/AH//2Q==',
};

export { data as default };

import meta from '$lib/assets/works/spor-istanbul-cli-4.jpg?w=548&as=meta:height;src;width';
import srcsetavif from '$lib/assets/works/spor-istanbul-cli-4.jpg?w=548&format=avif&as=srcset';
import srcsetwebp from '$lib/assets/works/spor-istanbul-cli-4.jpg?w=548&format=webp&as=srcset';
import srcsetauto from '$lib/assets/works/spor-istanbul-cli-4.jpg?w=548&format=jpeg&as=srcset';
const { height, src, width } = meta;

const data = {
  slug: 'spor-istanbul-cli-4',
  width,
  height,
  alt: 'Spor Istanbul CLI wait screen',
  src,
  sources: [
    { srcset: srcsetavif, type: 'image/avif' },
    { srcset: srcsetwebp, type: 'image/webp' },
    { srcset: srcsetauto, type: 'image/jpeg' },
  ],
  dominantColour: '#81828',
  placeholder:
    'data:image/jpeg;base64,/9j/2wBDAAwREhMUFBUUFBofGhUaHiIcGhohKC4jJB4hMzg/PTouKC5CRFpMPi5XRTc3VmBRVlpgZmRkQklveXFmeFtlaWf/2wBDAQgMDQwNDw8PDxFgEBIaVmBaYFpgY2NjY2BjYGBiY2NjY2NjY2NjY2NjY2JjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wgARCAALAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAEH/8QAFAEBAAAAAAAAAAAAAAAAAAAABP/aAAwDAQACEAMQAAAAzgrR/wD/xAAXEAADAQAAAAAAAAAAAAAAAAABEiAx/9oACAEBAAE/AGOR/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAgBAgEBPwB//8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAgBAwEBPwB//9k=',
};

export { data as default };

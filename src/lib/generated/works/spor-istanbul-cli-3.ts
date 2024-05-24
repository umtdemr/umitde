import meta from '$lib/assets/works/spor-istanbul-cli-3.png?w=548&as=meta:height;src;width';
import srcsetavif from '$lib/assets/works/spor-istanbul-cli-3.png?w=548&format=avif&as=srcset';
import srcsetwebp from '$lib/assets/works/spor-istanbul-cli-3.png?w=548&format=webp&as=srcset';
import srcsetauto from '$lib/assets/works/spor-istanbul-cli-3.png?w=548&format=png&as=srcset';
const { height, src, width } = meta;

const data = {
  slug: 'spor-istanbul-cli-3',
  width,
  height,
  alt: 'Spor Istanbul CLI session chooser screen',
  src,
  sources: [
    { srcset: srcsetavif, type: 'image/avif' },
    { srcset: srcsetwebp, type: 'image/webp' },
    { srcset: srcsetauto, type: 'image/png' },
  ],
  dominantColour: '#81828',
  placeholder:
    'data:image/jpeg;base64,/9j/2wBDAAwREhMUFBUUFBofGhUaHiIcGhohKC4jJB4hMzg/PTouKC5CRFpMPi5XRTc3VmBRVlpgZmRkQklveXFmeFtlaWf/2wBDAQgMDQwNDw8PDxFgEBIaVmBaYFpgY2NjY2BjYGBiY2NjY2NjY2NjY2NjY2JjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wgARCAALAAoDASIAAhEBAxEB/8QAFwAAAwEAAAAAAAAAAAAAAAAAAAECB//EABQBAQAAAAAAAAAAAAAAAAAAAAT/2gAMAwEAAhADEAAAAM5JTSf/xAAXEAADAQAAAAAAAAAAAAAAAAAAECEi/9oACAEBAAE/AIZf/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAgBAgEBPwB//8QAFREBAQAAAAAAAAAAAAAAAAAAAAH/2gAIAQMBAT8Ar//Z',
};

export { data as default };

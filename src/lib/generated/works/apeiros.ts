import meta from '$lib/assets/works/apeiros.jpg?w=548&as=meta:height;src;width';
import srcsetavif from '$lib/assets/works/apeiros.jpg?w=548&format=avif&as=srcset';
import srcsetwebp from '$lib/assets/works/apeiros.jpg?w=548&format=webp&as=srcset';
import srcsetauto from '$lib/assets/works/apeiros.jpg?w=548&format=jpeg&as=srcset';
const { height, src, width } = meta;

const data = {
  slug: 'apeiros',
  width,
  height,
  alt: 'Apeiros',
  src,
  sources: [
    { srcset: srcsetavif, type: 'image/avif' },
    { srcset: srcsetwebp, type: 'image/webp' },
    { srcset: srcsetauto, type: 'image/jpeg' },
  ],
  dominantColour: '#f8f8f8',
  placeholder:
    'data:image/jpeg;base64,/9j/2wBDAAwREhMUFBUUFBofGhUaHiIcGhohKC4jJB4hMzg/PTouKC5CRFpMPi5XRTc3VmBRVlpgZmRkQklveXFmeFtlaWf/2wBDAQgMDQwNDw8PDxFgEBIaVmBaYFpgY2NjY2BjYGBiY2NjY2NjY2NjY2NjY2JjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wgARCAALAAoDASIAAhEBAxEB/8QAFwAAAwEAAAAAAAAAAAAAAAAAAAIDB//EABQBAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhADEAAAANLowf/EABoQAAICAwAAAAAAAAAAAAAAAAECERIgIUH/2gAIAQEAAT8Ad6CzGBrk4f/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQIBAT8Af//EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQMBAT8Af//Z',
};

export { data as default };

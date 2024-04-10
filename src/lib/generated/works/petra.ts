import meta from '$lib/assets/works/petra.jpg?w=548&as=meta:height;src;width';
import srcsetavif from '$lib/assets/works/petra.jpg?w=548&format=avif&as=srcset';
import srcsetwebp from '$lib/assets/works/petra.jpg?w=548&format=webp&as=srcset';
import srcsetauto from '$lib/assets/works/petra.jpg?w=548&format=jpeg&as=srcset';
const { height, src, width } = meta;

const data = {
  slug: 'petra',
  width,
  height,
  alt: 'Petra coffee roasting',
  src,
  sources: [
    { srcset: srcsetavif, type: 'image/avif' },
    { srcset: srcsetwebp, type: 'image/webp' },
    { srcset: srcsetauto, type: 'image/jpeg' },
  ],
  dominantColour: '#f8f8f8',
  placeholder:
    'data:image/jpeg;base64,/9j/2wBDAAwREhMUFBUUFBofGhUaHiIcGhohKC4jJB4hMzg/PTouKC5CRFpMPi5XRTc3VmBRVlpgZmRkQklveXFmeFtlaWf/2wBDAQgMDQwNDw8PDxFgEBIaVmBaYFpgY2NjY2BjYGBiY2NjY2NjY2NjY2NjY2JjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wgARCAALAAoDASIAAhEBAxEB/8QAFwAAAwEAAAAAAAAAAAAAAAAAAwQFBv/EABUBAQEAAAAAAAAAAAAAAAAAAAAB/9oADAMBAAIQAxAAAADZt1Rr/8QAHhAAAgEEAwEAAAAAAAAAAAAAAQIRAAMEEhAhI0H/2gAIAQEAAT8AfKcOw9AAezr8mKtZ1p7aOu2rKGErUDj/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oACAECAQE/AH//xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oACAEDAQE/AH//2Q==',
};

export { data as default };

import meta from '$lib/assets/works/smile-mirror.jpg?w=548&as=meta:height;src;width';
import srcsetavif from '$lib/assets/works/smile-mirror.jpg?w=548&format=avif&as=srcset';
import srcsetwebp from '$lib/assets/works/smile-mirror.jpg?w=548&format=webp&as=srcset';
import srcsetauto from '$lib/assets/works/smile-mirror.jpg?w=548&format=jpeg&as=srcset';
const { height, src, width } = meta;

const data = {
  slug: 'smile-mirror',
  width,
  height,
  alt: 'Smile mirror',
  src,
  sources: [
    { srcset: srcsetavif, type: 'image/avif' },
    { srcset: srcsetwebp, type: 'image/webp' },
    { srcset: srcsetauto, type: 'image/jpeg' },
  ],
  dominantColour: '#484848',
  placeholder:
    'data:image/jpeg;base64,/9j/2wBDAAwREhMUFBUUFBofGhUaHiIcGhohKC4jJB4hMzg/PTouKC5CRFpMPi5XRTc3VmBRVlpgZmRkQklveXFmeFtlaWf/2wBDAQgMDQwNDw8PDxFgEBIaVmBaYFpgY2NjY2BjYGBiY2NjY2NjY2NjY2NjY2JjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wgARCAALAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAABQb/xAAUAQEAAAAAAAAAAAAAAAAAAAAC/9oADAMBAAIQAxAAAAAkOzuC/wD/xAAiEAEAAgECBgMAAAAAAAAAAAABAgMAEiEEERQiMWKBkbH/2gAIAQEAAT8ArrtnIqhJiWU8u3bUh4XOjt9PmQOcNKRVWjuMv1wrrANEfoz/xAAXEQADAQAAAAAAAAAAAAAAAAAAERJB/9oACAECAQE/AI1n/8QAGBEAAgMAAAAAAAAAAAAAAAAAAAEREjH/2gAIAQMBAT8Ausg//9k=',
};

export { data as default };

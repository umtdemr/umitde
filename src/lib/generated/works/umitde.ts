import meta from '$lib/assets/works/umitde.jpg?w=548&as=meta:height;src;width';
import srcsetavif from '$lib/assets/works/umitde.jpg?w=548&format=avif&as=srcset';
import srcsetwebp from '$lib/assets/works/umitde.jpg?w=548&format=webp&as=srcset';
import srcsetauto from '$lib/assets/works/umitde.jpg?w=548&format=jpeg&as=srcset';
const { height, src, width } = meta;

const data = {
  slug: 'umitde',
  width,
  height,
  alt: 'Umitde.com',
  src,
  sources: [
    { srcset: srcsetavif, type: 'image/avif' },
    { srcset: srcsetwebp, type: 'image/webp' },
    { srcset: srcsetauto, type: 'image/jpeg' },
  ],
  dominantColour: '#182828',
  placeholder:
    'data:image/jpeg;base64,/9j/2wBDAAwREhMUFBUUFBofGhUaHiIcGhohKC4jJB4hMzg/PTouKC5CRFpMPi5XRTc3VmBRVlpgZmRkQklveXFmeFtlaWf/2wBDAQgMDQwNDw8PDxFgEBIaVmBaYFpgY2NjY2BjYGBiY2NjY2NjY2NjY2NjY2JjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wgARCAALAAoDASIAAhEBAxEB/8QAFwAAAwEAAAAAAAAAAAAAAAAAAQMEBv/EABUBAQEAAAAAAAAAAAAAAAAAAAID/9oADAMBAAIQAxAAAADJwrFD/8QAHxABAAIBAwUAAAAAAAAAAAAAAQIDAAQQEhEhMVJh/9oACAEBAAE/AKDUXV2TgnCroSWXEFxut9s+Hh7pt//EABYRAAMAAAAAAAAAAAAAAAAAAAARIf/aAAgBAgEBPwBw/8QAFhEAAwAAAAAAAAAAAAAAAAAAAAER/9oACAEDAQE/AIj/2Q==',
};

export { data as default };

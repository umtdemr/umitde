import meta from '$lib/assets/works/person-alarm2.jpg?w=548&as=meta:height;src;width';
import srcsetavif from '$lib/assets/works/person-alarm2.jpg?w=548&format=avif&as=srcset';
import srcsetwebp from '$lib/assets/works/person-alarm2.jpg?w=548&format=webp&as=srcset';
import srcsetauto from '$lib/assets/works/person-alarm2.jpg?w=548&format=jpeg&as=srcset';
const { height, src, width } = meta;

const data = {
  slug: 'person-alarm2',
  width,
  height,
  alt: 'Person Alarm',
  src,
  sources: [
    { srcset: srcsetavif, type: 'image/avif' },
    { srcset: srcsetwebp, type: 'image/webp' },
    { srcset: srcsetauto, type: 'image/jpeg' },
  ],
  dominantColour: '#282828',
  placeholder:
    'data:image/jpeg;base64,/9j/2wBDAAwREhMUFBUUFBofGhUaHiIcGhohKC4jJB4hMzg/PTouKC5CRFpMPi5XRTc3VmBRVlpgZmRkQklveXFmeFtlaWf/2wBDAQgMDQwNDw8PDxFgEBIaVmBaYFpgY2NjY2BjYGBiY2NjY2NjY2NjY2NjY2JjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wgARCAALAAoDASIAAhEBAxEB/8QAFwAAAwEAAAAAAAAAAAAAAAAAAwQFBv/EABUBAQEAAAAAAAAAAAAAAAAAAAID/9oADAMBAAIQAxAAAADNkirin//EACIQAAECAwkAAAAAAAAAAAAAAAIAAQMSIQQQERMVIlNhcf/aAAgBAQABPwB7NAyxIokpYbRd2r4tMHkRkTydNS7/xAAYEQACAwAAAAAAAAAAAAAAAAABIQAREv/aAAgBAgEBPwAaoNz/xAAYEQEBAAMAAAAAAAAAAAAAAAACAQADEv/aAAgBAwEBPwDbQm6Jyc//2Q==',
};

export { data as default };

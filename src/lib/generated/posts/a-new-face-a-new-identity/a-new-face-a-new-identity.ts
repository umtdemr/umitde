import meta from '$lib/assets/blog/a-new-face-a-new-identity/a-new-face-a-new-identity.png?w=760&as=meta:height;src;width';
import srcsetavif from '$lib/assets/blog/a-new-face-a-new-identity/a-new-face-a-new-identity.png?w=760&format=avif&as=srcset';
import srcsetwebp from '$lib/assets/blog/a-new-face-a-new-identity/a-new-face-a-new-identity.png?w=760&format=webp&as=srcset';
import srcsetauto from '$lib/assets/blog/a-new-face-a-new-identity/a-new-face-a-new-identity.png?w=760&format=png&as=srcset';
const { height, src, width } = meta;

const data = {
  slug: 'a-new-face-a-new-identity',
  width,
  height,
  src,
  alt: 'my new websites homepage on mobile',
  sources: [
    { srcset: srcsetavif, type: 'image/avif' },
    { srcset: srcsetwebp, type: 'image/webp' },
    { srcset: srcsetauto, type: 'image/png' },
  ],
  dominantColour: '#182828',
  placeholder:
    'data:image/jpeg;base64,/9j/2wBDAAwREhMUFBUUFBofGhUaHiIcGhohKC4jJB4hMzg/PTouKC5CRFpMPi5XRTc3VmBRVlpgZmRkQklveXFmeFtlaWf/2wBDAQgMDQwNDw8PDxFgEBIaVmBaYFpgY2NjY2BjYGBiY2NjY2NjY2NjY2NjY2JjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wgARCAAFAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAMG/8QAFAEBAAAAAAAAAAAAAAAAAAAAAf/aAAwDAQACEAMQAAAAxEBP/8QAHRAAAQMFAQAAAAAAAAAAAAAAAQARIQIDEhNRwf/aAAgBAQABPwC6QHbJ4kkHxbKur//EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQIBAT8Af//EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQMBAT8Af//Z',
};

export { data as default };

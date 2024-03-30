import meta from '$lib/assets/works/person-alarm.jpeg?w=548&as=meta:height;src;width';
import srcsetavif from '$lib/assets/works/person-alarm.jpeg?w=548&format=avif&as=srcset';
import srcsetwebp from '$lib/assets/works/person-alarm.jpeg?w=548&format=webp&as=srcset';
import srcsetauto from '$lib/assets/works/person-alarm.jpeg?w=548&format=jpeg&as=srcset';
const { height, src, width } = meta;

const data = {
  slug: 'person-alarm',
  width,
  height,
  alt: 'Person Alarm',
  src,
  sources: [
    { srcset: srcsetavif, type: 'image/avif' },
    { srcset: srcsetwebp, type: 'image/webp' },
    { srcset: srcsetauto, type: 'image/jpeg' },
  ],
  dominantColour: '#685848',
  placeholder:
    'data:image/jpeg;base64,/9j/2wBDAAwREhMUFBUUFBofGhUaHiIcGhohKC4jJB4hMzg/PTouKC5CRFpMPi5XRTc3VmBRVlpgZmRkQklveXFmeFtlaWf/2wBDAQgMDQwNDw8PDxFgEBIaVmBaYFpgY2NjY2BjYGBiY2NjY2NjY2NjY2NjY2JjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wgARCAALAAoDASIAAhEBAxEB/8QAFwAAAwEAAAAAAAAAAAAAAAAAAgMFBv/EABQBAQAAAAAAAAAAAAAAAAAAAAL/2gAMAwEAAhADEAAAAIy9KQf/xAAeEAACAgICAwAAAAAAAAAAAAABAgARAxMEBSFBYf/aAAgBAQABPwDLhIGvb9v2Ina89FVAq0oAFrGVSASPIMuf/8QAFhEBAQEAAAAAAAAAAAAAAAAAAgAS/9oACAECAQE/ACs3/8QAFhEAAwAAAAAAAAAAAAAAAAAAAAEh/9oACAEDAQE/AHT/2Q==',
};

export { data as default };

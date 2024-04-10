import meta from '$lib/assets/works/mimic-robot.jpg?w=548&as=meta:height;src;width';
import srcsetavif from '$lib/assets/works/mimic-robot.jpg?w=548&format=avif&as=srcset';
import srcsetwebp from '$lib/assets/works/mimic-robot.jpg?w=548&format=webp&as=srcset';
import srcsetauto from '$lib/assets/works/mimic-robot.jpg?w=548&format=jpeg&as=srcset';
const { height, src, width } = meta;

const data = {
  slug: 'mimic-robot',
  width,
  height,
  alt: 'Mimic Robot',
  src,
  sources: [
    { srcset: srcsetavif, type: 'image/avif' },
    { srcset: srcsetwebp, type: 'image/webp' },
    { srcset: srcsetauto, type: 'image/jpeg' },
  ],
  dominantColour: '#c8c8c8',
  placeholder:
    'data:image/jpeg;base64,/9j/2wBDAAwREhMUFBUUFBofGhUaHiIcGhohKC4jJB4hMzg/PTouKC5CRFpMPi5XRTc3VmBRVlpgZmRkQklveXFmeFtlaWf/2wBDAQgMDQwNDw8PDxFgEBIaVmBaYFpgY2NjY2BjYGBiY2NjY2NjY2NjY2NjY2JjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wgARCAALAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABAIG/8QAFQEBAQAAAAAAAAAAAAAAAAAAAQP/2gAMAwEAAhADEAAAANQ6VTf/xAAbEAACAgMBAAAAAAAAAAAAAAABAgASEBEhUf/aAAgBAQABPwDZDr5gKtl5Kif/xAAWEQEBAQAAAAAAAAAAAAAAAAABADH/2gAIAQIBAT8ADb//xAAWEQADAAAAAAAAAAAAAAAAAAAAAUH/2gAIAQMBAT8AcP/Z',
};

export { data as default };

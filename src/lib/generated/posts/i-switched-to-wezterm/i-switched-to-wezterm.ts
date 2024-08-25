import meta from '$lib/assets/blog/i-switched-to-wezterm/i-switched-to-wezterm.png?w=760&as=meta:height;src;width';
import srcsetavif from '$lib/assets/blog/i-switched-to-wezterm/i-switched-to-wezterm.png?w=760&format=avif&as=srcset';
import srcsetwebp from '$lib/assets/blog/i-switched-to-wezterm/i-switched-to-wezterm.png?w=760&format=webp&as=srcset';
import srcsetauto from '$lib/assets/blog/i-switched-to-wezterm/i-switched-to-wezterm.png?w=760&format=png&as=srcset';
const { height, src, width } = meta;

const data = {
  slug: 'i-switched-to-wezterm',
  width,
  height,
  src,
  alt: 'my new websites homepage on mobile',
  sources: [
    { srcset: srcsetavif, type: 'image/avif' },
    { srcset: srcsetwebp, type: 'image/webp' },
    { srcset: srcsetauto, type: 'image/png' },
  ],
  dominantColour: '#81818',
  placeholder:
    'data:image/jpeg;base64,/9j/2wBDAAwREhMUFBUUFBofGhUaHiIcGhohKC4jJB4hMzg/PTouKC5CRFpMPi5XRTc3VmBRVlpgZmRkQklveXFmeFtlaWf/2wBDAQgMDQwNDw8PDxFgEBIaVmBaYFpgY2NjY2BjYGBiY2NjY2NjY2NjY2NjY2JjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wgARCAAFAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAEH/8QAFQEBAQAAAAAAAAAAAAAAAAAAAQL/2gAMAwEAAhADEAAAAM1hZ//EABUQAQEAAAAAAAAAAAAAAAAAAAEQ/9oACAEBAAE/ACf/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oACAECAQE/AH//xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oACAEDAQE/AH//2Q==',
};

export { data as default };

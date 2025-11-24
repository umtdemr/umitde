import meta from '$lib/assets/blog/handling-dynamic-json-payloads-in-go/handling-dynamic-json-payloads-in-go.jpg?w=760&as=meta:height;src;width';
import srcsetavif from '$lib/assets/blog/handling-dynamic-json-payloads-in-go/handling-dynamic-json-payloads-in-go.jpg?w=760&format=avif&as=srcset';
import srcsetwebp from '$lib/assets/blog/handling-dynamic-json-payloads-in-go/handling-dynamic-json-payloads-in-go.jpg?w=760&format=webp&as=srcset';
import srcsetauto from '$lib/assets/blog/handling-dynamic-json-payloads-in-go/handling-dynamic-json-payloads-in-go.jpg?w=760&format=jpeg&as=srcset';
const { height, src, width } = meta;

const data = {
  slug: 'handling-dynamic-json-payloads-in-go',
  width,
  height,
  src,
  alt: 'Go Gopher routing data packets based on their type labels',
  sources: [
    { srcset: srcsetavif, type: 'image/avif' },
    { srcset: srcsetwebp, type: 'image/webp' },
    { srcset: srcsetauto, type: 'image/jpeg' },
  ],
  dominantColour: '#f8e8d8',
  placeholder:
    'data:image/jpeg;base64,/9j/2wBDAAwREhMUFBUUFBofGhUaHiIcGhohKC4jJB4hMzg/PTouKC5CRFpMPi5XRTc3VmBRVlpgZmRkQklveXFmeFtlaWf/2wBDAQgMDQwNDw8PDxFgEBIaVmBaYFpgY2NjY2BjYGBiY2NjY2NjY2NjY2NjY2JjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wgARCAAFAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAEF/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAL/2gAMAwEAAhADEAAAAN6CP//EAB0QAQEAAQQDAAAAAAAAAAAAAAECAAMEESExMlL/2gAIAQEAAT8AvVoLiVC1fP105O6JmZJrgA98/8QAFxEBAAMAAAAAAAAAAAAAAAAAAQACA//aAAgBAgEBPwDMGs//xAAYEQACAwAAAAAAAAAAAAAAAAAAAgEDIf/aAAgBAwEBPwC9pVsP/9k=',
};

export { data as default };

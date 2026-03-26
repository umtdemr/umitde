import meta from '$lib/assets/blog/i-built-a-whiteboard-accidentally/i-built-a-whiteboard-accidentally.jpg?w=760&as=meta:height;src;width';
import srcsetavif from '$lib/assets/blog/i-built-a-whiteboard-accidentally/i-built-a-whiteboard-accidentally.jpg?w=760&format=avif&as=srcset';
import srcsetwebp from '$lib/assets/blog/i-built-a-whiteboard-accidentally/i-built-a-whiteboard-accidentally.jpg?w=760&format=webp&as=srcset';
import srcsetauto from '$lib/assets/blog/i-built-a-whiteboard-accidentally/i-built-a-whiteboard-accidentally.jpg?w=760&format=jpeg&as=srcset';
const { height, src, width } = meta;

const data = {
  slug: 'i-built-a-whiteboard-accidentally',
  width,
  height,
  src,
  alt: 'eskiz.io digital sketch and logo editor interface',
  sources: [
    { srcset: srcsetavif, type: 'image/avif' },
    { srcset: srcsetwebp, type: 'image/webp' },
    { srcset: srcsetauto, type: 'image/jpeg' },
  ],
  dominantColour: '#e8e8e8',
  placeholder:
    'data:image/jpeg;base64,/9j/2wBDAAwREhMUFBUUFBofGhUaHiIcGhohKC4jJB4hMzg/PTouKC5CRFpMPi5XRTc3VmBRVlpgZmRkQklveXFmeFtlaWf/2wBDAQgMDQwNDw8PDxFgEBIaVmBaYFpgY2NjY2BjYGBiY2NjY2NjY2NjY2NjY2JjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wgARCAAFAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAMH/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEAMQAAAA0Sof/8QAGxAAAQQDAAAAAAAAAAAAAAAAAQIQERIhI3H/2gAIAQEAAT8AovOwxwN//8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAgBAgEBPwB//8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAgBAwEBPwB//9k=',
};

export { data as default };

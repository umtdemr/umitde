// vite-imagetools ships no client types; these cover the query imports used in this repo

// $lib/images/header_bg.jpeg?as=metadata (home page og:image)
declare module '*?as=metadata' {
	export const src: string;
	export const width: number;
	export const height: number;
	export const format: string;
}

// src/lib/generated/**: ?w=…&as=meta:height;src;width
declare module '*&as=meta:height;src;width' {
	const meta: { height: number; src: string; width: number };
	export default meta;
}

// src/lib/generated/**: ?w=…&format=…&as=srcset
declare module '*&as=srcset' {
	const srcset: string;
	export default srcset;
}

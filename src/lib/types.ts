type ImageSource = {
	srcset: string;
	type: string;
};

export type ImageData = {
	slug: string;
	width: number;
	height: number;
	src: string;
	sources: ImageSource[];
	dominantColour: string;
	placeholder: string;
};

/** Frontmatter of a post in src/posts/<slug>/<slug>.md */
export type PostMeta = {
	title: string;
	description?: string;
	date: string;
	lastUpdated?: string;
	slug: string;
	published: boolean;
	image: string;
	imageAlt?: string;
	categories?: string[];
};

export type PostSummary = {
	slug: string;
	title: string;
	description?: string;
	/** ISO timestamp, UTC midnight of the frontmatter date */
	date: string;
	/** ISO timestamp of the frontmatter lastUpdated */
	updated?: string;
	/** first category, lower-cased */
	tag: string | null;
	readingMinutes: number;
};

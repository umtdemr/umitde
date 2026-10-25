export type Categories = 'general' | 'programming'

export type Post = {
    title: string;
    description?: string;
    date: string;
    strDate: string;
    slug: string;
    categories?: Categories[];
    published: boolean;
    imageData: ImageData
}

export type Path = {
    path: string;
}


type ImageSource = {
    srcset: string;
    type: string;
}

export type ImageData = {
    slug: string;
    width: number;
    height: number;
    src: string;
    sources: ImageSource[];
    dominantColour: string;
    placeholder: string;
}


export type PostWithPath = Post & Path;

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
}

export type PostSummary = {
    slug: string;
    title: string;
    description?: string;
    /** ISO timestamp, UTC midnight of the frontmatter date */
    date: string;
    /** first category, lower-cased */
    tag: string | null;
    readingMinutes: number;
}

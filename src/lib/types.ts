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
export type Categories = 'general' | 'programming'

export type Post = {
    title: string;
    description?: string;
    date: string;
    strDate: string;
    slug: string;
    categories?: Categories[];
    published: boolean;
}

export type Path = {
    path: string;
}


export type PostWithPath = Post & Path;
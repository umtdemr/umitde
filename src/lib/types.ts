export type Categories = 'general' | 'programming'

export type Post = {
    title: string;
    description?: string;
    date: string;
    slug: string;
    categories?: Categories[];
    published: boolean;
}
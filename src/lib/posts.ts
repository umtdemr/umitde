import type { PostMeta, PostSummary } from './types';

const WORDS_PER_MINUTE = 200;

const DATE_FORMATS: Record<'day' | 'month', Intl.DateTimeFormatOptions> = {
	day: { month: 'short', day: 'numeric', year: 'numeric' },
	month: { month: 'short', year: 'numeric' }
};

/** Frontmatter dates are UTC midnight, so format in UTC or the day shifts west of Greenwich. */
export function formatDate(iso: string, style: 'day' | 'month'): string {
	return new Date(iso).toLocaleDateString('en-US', { ...DATE_FORMATS[style], timeZone: 'UTC' });
}

export function readingMinutes(markdown: string): number {
	const text = markdown
		.replace(/^---\r?\n[\s\S]*?\r?\n---/, '')
		.replace(/<script[\s\S]*?<\/script>/g, '');
	const words = text.split(/\s+/).filter(Boolean).length;
	return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
}

/** `modules` and `raw` are the same import.meta.glob, keyed by file path. */
export function toSummaries(
	modules: Record<string, { metadata: PostMeta }>,
	raw: Record<string, string>
): PostSummary[] {
	return Object.entries(modules)
		.map(([path, { metadata }]) => ({ path, metadata }))
		.filter(({ metadata }) => metadata.published)
		.map(({ path, metadata }) => ({
			slug: metadata.slug,
			title: metadata.title,
			description: metadata.description,
			date: new Date(metadata.date).toISOString(),
			tag: metadata.categories?.[0]?.toLowerCase() ?? null,
			readingMinutes: readingMinutes(raw[path] ?? '')
		}))
		.sort((a, b) => b.date.localeCompare(a.date));
}

/** `posts` must be sorted newest first, as toSummaries returns them. */
export function adjacent(
	posts: PostSummary[],
	slug: string
): { older: PostSummary | null; newer: PostSummary | null } {
	const index = posts.findIndex((post) => post.slug === slug);
	if (index === -1) return { older: null, newer: null };
	return { older: posts[index + 1] ?? null, newer: posts[index - 1] ?? null };
}

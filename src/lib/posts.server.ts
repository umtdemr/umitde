import { toSummaries } from './posts';
import type { PostMeta, PostSummary } from './types';

// server-only: an eager glob in client code would bundle every post into the page
export function getPosts(): PostSummary[] {
	const modules = import.meta.glob<{ metadata: PostMeta }>('/src/posts/*/*.md', { eager: true });
	const raw = import.meta.glob<string>('/src/posts/*/*.md', {
		eager: true,
		query: '?raw',
		import: 'default'
	});
	return toSummaries(modules, raw);
}

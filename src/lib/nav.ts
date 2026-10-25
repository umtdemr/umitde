export type Section = 'writing' | 'works' | 'about';

/** Which header link to mark as current. Posts belong to "writing"; the home page marks none. */
export function activeSection(pathname: string): Section | null {
	const first = pathname.split('/')[1];
	if (first === 'blog') return 'writing';
	if (first === 'works' || first === 'about') return first;
	return null;
}

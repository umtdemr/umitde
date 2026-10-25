<script lang="ts">
	import { page } from '$app/state';
	import website from '$lib/config/website';
	import defaultImage from '$lib/images/header_bg.jpeg?as=metadata';

	type Image = { src: string; width?: number; height?: number; alt?: string };
	type Article = { headline: string; published: string; modified?: string };

	type Props = {
		title: string;
		description: string;
		type?: 'website' | 'article';
		/** defaults to the home page header photo */
		image?: Image;
		/** adds article:* meta and BlogPosting structured data */
		article?: Article;
	};

	let { title, description, type = 'website', image, article }: Props = $props();

	// built from siteUrl, not page.url: during prerender page.url's origin is http://sveltekit-prerender
	const absolute = (path: string) => new URL(path, website.siteUrl).href;

	const url = $derived(absolute(page.url.pathname));
	const ogImage = $derived(
		image ?? { src: defaultImage.src, width: defaultImage.width, height: defaultImage.height }
	);

	// frontmatter dates are UTC midnight while lastUpdated has a time, so an edit on the publish day can sort before it
	const modified = $derived(
		article?.modified && article.modified > article.published
			? article.modified
			: article?.published
	);

	const jsonLd = $derived(
		article &&
			JSON.stringify({
				'@context': 'https://schema.org',
				'@type': 'BlogPosting',
				headline: article.headline,
				description,
				image: absolute(ogImage.src),
				datePublished: article.published,
				dateModified: modified,
				author: { '@type': 'Person', name: website.author, url: website.siteUrl },
				mainEntityOfPage: url
			})
				// escapes "<" so a closing script tag in a title or description cannot end the tag
				.replace(/</g, '\\u003c')
	);
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={url} />

	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:type" content={type} />
	<meta property="og:url" content={url} />
	<meta property="og:locale" content={website.ogLanguage} />
	<meta property="og:image" content={absolute(ogImage.src)} />
	{#if ogImage.width}<meta property="og:image:width" content={String(ogImage.width)} />{/if}
	{#if ogImage.height}<meta property="og:image:height" content={String(ogImage.height)} />{/if}
	{#if ogImage.alt}<meta property="og:image:alt" content={ogImage.alt} />{/if}

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={absolute(ogImage.src)} />

	{#if article}
		<meta property="article:published_time" content={article.published} />
		<meta property="article:modified_time" content={modified} />
		<meta property="article:author" content={website.author} />
		{@html `<script type="application/ld+json">${jsonLd}</script>`}
	{/if}
</svelte:head>

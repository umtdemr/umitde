<script lang="ts">
	import { page } from '$app/state';
	import { formatDate } from '$lib/posts';
	import '$lib/styles/prose.css';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const Content = $derived(data.content);
	const title = $derived(`${data.post.title} - Ümit Demir`);
	const metaRest = $derived(
		[data.post.tag, `${data.post.readingMinutes} min`]
			.filter(Boolean)
			.map((part) => ` · ${part}`)
			.join('')
	);
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={data.post.description} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={data.post.description} />
	<meta property="og:type" content="article" />
	<meta property="og:url" content={page.url.href} />
	<meta property="og:image" content={data.imageData.src} />
	<meta property="og:image:width" content="760" />
	<meta property="og:image:height" content="367" />
	<meta property="og:image:alt" content={data.imageData.alt} />
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:title" content={title} />
	<meta property="twitter:description" content={data.post.description} />
	<meta property="twitter:site" content="@mediumgoal" />
	<meta property="twitter:creator" content="@mediumgoal" />
	<meta property="twitter:image" content={data.imageData.src} />
	<meta property="twitter:url" content={page.url.href} />
</svelte:head>

<article class="col">
	<header>
		<p class="meta mono">
			<time datetime={data.post.date}>{formatDate(data.post.date, 'day')}</time>{metaRest}
		</p>
		<h1>{data.post.title}</h1>
	</header>

	<div class="prose">
		<Content />
	</div>

	<nav aria-label="Post navigation">
		{#if data.older}
			<a href="/blog/{data.older.slug}">
				<span class="mono">← older</span>{data.older.title}
			</a>
		{/if}
		{#if data.newer}
			<a class="newer" href="/blog/{data.newer.slug}">
				<span class="mono">newer →</span>{data.newer.title}
			</a>
		{/if}
	</nav>
</article>

<style>
	article {
		display: flex;
		flex-direction: column;
		gap: 40px;
		padding-top: 24px;
		padding-bottom: 64px;
	}

	header {
		display: flex;
		flex-direction: column;
		gap: 14px;
	}

	.meta {
		margin: 0;
		font-size: 13px;
		color: var(--muted);
	}

	h1 {
		margin: 0;
		font-size: 40px;
		line-height: 1.1;
		font-weight: 700;
		letter-spacing: -0.025em;
	}

	nav {
		display: flex;
		justify-content: space-between;
		gap: 24px;
		flex-wrap: wrap;
		padding-top: 24px;
		border-top: 1px solid var(--rule);
		font-size: 16px;
	}

	nav a {
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	/* stays on the right even when there is no older post */
	nav .newer {
		margin-left: auto;
		text-align: right;
	}

	nav span {
		font-size: 12px;
		color: var(--muted);
	}
</style>

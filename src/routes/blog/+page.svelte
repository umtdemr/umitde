<script lang="ts">
	import { page } from '$app/state';
	import ListItem from '$lib/components/ListItem.svelte';
	import website from '$lib/config/website';
	import { formatDate, groupByYear } from '$lib/posts';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const title = `Writing - ${website.siteTitle}`;
	// meta only; the page itself shows just the heading
	const description = 'Notes on Go, canvas and embedded systems.';
	const years = $derived(groupByYear(data.posts));
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:type" content="website" />
	<meta property="og:url" content={page.url.href} />
</svelte:head>

<main class="col">
	<h1>Writing</h1>

	{#each years as group (group.year)}
		<section class="year" aria-labelledby="year-{group.year}">
			<h2 id="year-{group.year}" class="mono">{group.year}</h2>
			{#each group.posts as post (post.slug)}
				<ListItem
					href="/blog/{post.slug}"
					label={formatDate(post.date, 'monthDay')}
					datetime={post.date}
					title={post.title}
				/>
			{/each}
		</section>
	{/each}
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		gap: 48px;
		padding-top: 24px;
		padding-bottom: 80px;
	}

	h1 {
		margin: 0;
		font-size: 32px;
		font-weight: 700;
		letter-spacing: -0.02em;
	}

	.year {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	h2 {
		margin: 0 0 8px;
		font-size: 14px;
		font-weight: 400;
		color: var(--muted);
	}
</style>

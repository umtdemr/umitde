<script lang="ts">
	import Seo from '$lib/components/Seo.svelte';
	import ListItem from '$lib/components/ListItem.svelte';
	import website from '$lib/config/website';
	import { projects } from '$lib/data/projects';
	import { formatDate } from '$lib/posts';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const HOME_POSTS = 5;

	const featured = projects.filter((project) => project.home);
	const latest = $derived(data.posts.slice(0, HOME_POSTS));
</script>

<Seo title={website.siteTitle} description="Software engineer based in Istanbul, Turkey" />

<main class="col">
	<section class="intro">
		<h1>Hi, I'm Ümit.</h1>
		<p>
			Software engineer in Istanbul. I work with Go, React and Next.js, and write about canvas
			rendering, Go, the tools I use and, hopefully soon, system design. Currently building
			<a href="https://eskiz.io">eskiz.io</a>.
		</p>
	</section>

	<section id="writing" class="list" aria-labelledby="writing-heading">
		<div class="heading">
			<h2 id="writing-heading" class="mono">writing</h2>
			<a class="all mono" href="/blog">all writings →</a>
		</div>
		{#each latest as post (post.slug)}
			<ListItem
				href="/blog/{post.slug}"
				label={formatDate(post.date, 'month')}
				datetime={post.date}
				title={post.title}
			/>
		{/each}
	</section>

	<section class="list" aria-labelledby="works-heading">
		<div class="heading">
			<h2 id="works-heading" class="mono">works</h2>
			<a class="all mono" href="/works">all works →</a>
		</div>
		{#each featured as project (project.slug)}
			<ListItem
				href="/works#{project.slug}"
				label={project.home?.label ?? ''}
				title={project.name}
				suffix="— {project.home?.line}"
			/>
		{/each}
	</section>
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		gap: 64px;
		padding-top: 24px;
		padding-bottom: 80px;
	}

	.intro {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	h1 {
		margin: 0;
		font-size: 32px;
		font-weight: 700;
		letter-spacing: -0.02em;
	}

	.intro p {
		margin: 0;
		font-size: 18px;
		line-height: 1.65;
		color: var(--text2);
	}

	.intro a {
		text-decoration: underline;
		text-underline-offset: 3px;
	}

	.list {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.heading {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		gap: 16px;
		margin-bottom: 8px;
	}

	h2 {
		margin: 0;
		font-size: 14px;
		font-weight: 400;
		color: var(--muted);
	}

	.all {
		font-size: 13px;
		color: var(--muted);
	}

	.all:hover {
		color: var(--accent);
	}
</style>

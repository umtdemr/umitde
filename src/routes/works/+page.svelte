<script lang="ts">
	import Seo from '$lib/components/Seo.svelte';
	import ProjectInfo from '$lib/components/ProjectInfo.svelte';
	import website from '$lib/config/website';
	import { projects, type Project } from '$lib/data/projects';
	import LazyToy from '$lib/toys/LazyToy.svelte';

	const title = `Works - ${website.siteTitle}`;
	const description = "A list of projects I've worked on or I'm working on";

	type Kind<K extends Project['kind']> = Extract<Project, { kind: K }>;

	const cards = projects.filter((project): project is Kind<'toy'> => project.kind === 'toy');
	const also = projects.filter((project): project is Kind<'also'> => project.kind === 'also');
</script>

<Seo {title} {description} />

<main class="col">
	<div class="intro">
		<h1>Works</h1>
		<p>Side projects, client work and school projects. A few of them are playable.</p>
	</div>

	<div class="cards">
		{#each cards as project (project.slug)}
			{#snippet info()}
				<ProjectInfo {project} />
			{/snippet}
			<article id={project.slug} class:span={project.wide}>
				<LazyToy name={project.toy} aspect={project.wide ? '16 / 10' : '4 / 3'} {info} />
			</article>
		{/each}
	</div>

	<section class="also" aria-labelledby="also-heading">
		<h2 id="also-heading" class="mono">also</h2>
		<div class="more">
			{#each also as project (project.slug)}
				<svelte:element this={project.href ? 'a' : 'div'} class="item" href={project.href}>
					<span class="name">{project.name}</span>
					<span class="description">{project.description} {project.stack}</span>
				</svelte:element>
			{/each}
		</div>
	</section>
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		gap: 48px;
		padding-top: 24px;
		padding-bottom: 80px;
	}

	.intro {
		display: flex;
		flex-direction: column;
		gap: 14px;
	}

	h1 {
		margin: 0;
		font-size: 32px;
		font-weight: 700;
		letter-spacing: -0.02em;
	}

	.intro p {
		margin: 0;
		max-width: 560px;
		font-size: 18px;
		line-height: 1.65;
		color: var(--text2);
	}

	.cards {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 56px 24px;
	}

	.span {
		grid-column: 1 / -1;
	}

	article {
		display: flex;
		flex-direction: column;
		gap: 14px;
	}

	.also {
		display: flex;
		flex-direction: column;
		gap: 20px;
		padding-top: 32px;
		border-top: 1px solid var(--rule);
	}

	h2 {
		margin: 0;
		font-size: 13px;
		font-weight: 400;
		color: var(--muted);
	}

	.more {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 20px 32px;
	}

	.item {
		display: flex;
		flex-direction: column;
		gap: 2px;
	}

	.item .name {
		font-size: 17px;
		font-weight: 600;
	}

	a.item:hover .name {
		color: var(--accent);
	}

	.item .description {
		font-size: 14px;
		color: var(--text2);
	}

	@media (max-width: 760px) {
		.cards,
		.more {
			grid-template-columns: 1fr;
		}
	}
</style>

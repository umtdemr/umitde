<script lang="ts">
	import { page } from '$app/state';
	import website from '$lib/config/website';
	import journey from './journey.json';

	const title = `About - ${website.siteTitle}`;
	const description =
		"Hi, I'm Ümit (means hope in Turkish), and I'm a software engineer. I live in Istanbul Turkey. " +
		'I love coding, problem solving, fitness and photography. ' +
		"Unlike most of the developers, I'm not that much into coffee. " +
		"Yes, I like it but I'm not particular about the beans or the brewing method. " +
		'I use Typescript, React, Svelte, Node js, Go and Python at my projects.';
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />

	<meta property="og:title" content={title} />
	<meta name="og:description" content={description} />
	<meta property="og:type" content="website" />
	<meta property="og:url" content={page.url.href} />

	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:site" content="@mediumgoal" />
	<meta property="twitter:creator" content="@mediumgoal" />
	<meta property="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
</svelte:head>

<main class="col">
	<section class="intro">
		<h1>About</h1>
		<p>
			Hi, I'm Ümit (means hope in Turkish), and I'm a software engineer. I live in Istanbul Turkey.
		</p>
		<p>
			I love coding, problem solving, fitness and photography. Unlike most of the developers, I'm
			not that much into coffee. Yes, I like it but I'm not particular about the beans or the
			brewing method.
		</p>
		<p>I use Typescript, React, Svelte, Node js, Go and Python at my projects.</p>
		<p>
			To contact me, you can send a mail to
			<a href="mailto:umitde296@gmail.com">umitde296@gmail.com</a>
		</p>
	</section>

	<section class="journey" aria-labelledby="journey-heading">
		<h2 id="journey-heading" class="mono">journey</h2>
		{#each journey.data as group (group.year)}
			<div class="group">
				<span class="year mono">{group.year}</span>
				<ul>
					{#each group.content as entry (entry.title)}
						<li>
							<span class="title">{entry.title}</span>
							<p>{entry.desc}</p>
						</li>
					{/each}
				</ul>
			</div>
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

	.journey {
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

	/* same columns as the home page lists */
	.group {
		display: grid;
		grid-template-columns: 96px 1fr;
		gap: 16px;
		align-items: baseline;
		padding: 10px 0;
	}

	.year {
		font-size: 13px;
		color: var(--muted);
	}

	ul {
		margin: 0;
		padding: 0;
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	li {
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.title {
		font-size: 18px;
	}

	li p {
		margin: 0;
		font-size: 15px;
		line-height: 1.55;
		color: var(--text2);
	}

	@media (max-width: 560px) {
		.group {
			grid-template-columns: 1fr;
			gap: 2px;
		}
	}
</style>

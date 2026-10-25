<script lang="ts">
	import { page } from '$app/state';
	import website from '$lib/config/website';

	const message = $derived(
		page.status === 404 ? 'Page not found' : (page.error?.message ?? 'Something went wrong')
	);
</script>

<svelte:head>
	<title>{page.status} - {website.siteTitle}</title>
</svelte:head>

<main class="col">
	<h1>{page.status}</h1>
	<p>{message}</p>
	<a href="/">← home</a>
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		gap: 16px;
		padding-top: 24px;
		padding-bottom: 80px;
	}

	h1 {
		margin: 0;
		font-size: 32px;
		font-weight: 700;
		letter-spacing: -0.02em;
	}

	p {
		margin: 0;
		font-size: 18px;
		line-height: 1.65;
		color: var(--text2);
	}

	a {
		font-family: 'JetBrains Mono', ui-monospace, monospace;
		font-size: 13px;
		color: var(--muted);
	}

	a:hover {
		color: var(--accent);
	}
</style>

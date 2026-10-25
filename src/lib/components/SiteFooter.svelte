<script lang="ts">
	const links = [
		{ label: 'github', href: 'https://github.com/umtdemr' },
		{ label: 'linkedin', href: 'https://linkedin.com/in/umtdemr' },
		{ label: 'rss', href: '/rss.xml' }
	];
</script>

<footer class="col mono">
	{#each links as link (link.label)}
		<a href={link.href}>{link.label}</a>
	{/each}
</footer>

<style>
	footer {
		display: flex;
		gap: 20px;
		flex-wrap: wrap;
		padding-top: 24px;
		padding-bottom: 48px;
		border-top: 1px solid var(--rule);
		font-size: 13px;
	}

	a {
		color: var(--muted);
	}

	a:hover {
		color: var(--accent);
	}
</style>

<script lang="ts">
	import { page } from '$app/state';
	import { activeSection, type Section } from '$lib/nav';
	import ThemeToggle from './ThemeToggle.svelte';

	const links: { section: Section; href: string }[] = [
		{ section: 'writing', href: '/#writing' },
		{ section: 'works', href: '/works' },
		{ section: 'about', href: '/about' }
	];

	const active = $derived(activeSection(page.url.pathname));
</script>

<header class="col">
	<a class="home" href="/">ümit demir</a>
	<nav aria-label="Main">
		{#each links as link (link.section)}
			<a href={link.href} aria-current={active === link.section ? 'page' : undefined}>
				{link.section}
			</a>
		{/each}
		<ThemeToggle />
	</nav>
</header>

<style>
	header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap;
		gap: 12px;
		padding-top: 40px;
		padding-bottom: 40px;
	}

	.home {
		font-weight: 700;
		font-size: 17px;
	}

	nav {
		display: flex;
		gap: 20px;
		align-items: center;
		font-size: 15px;
	}

	nav a {
		color: var(--muted);
	}

	nav a[aria-current='page'] {
		color: var(--ink);
	}

	nav a:hover {
		color: var(--accent);
	}
</style>

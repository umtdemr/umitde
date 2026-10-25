<script lang="ts">
	import type { Snippet } from 'svelte';
	import Analytics from '$lib/analytics.svelte';
	import SiteHeader from '$lib/components/SiteHeader.svelte';
	import SiteFooter from '$lib/components/SiteFooter.svelte';
	import website from '$lib/config/website';
	import '../app.css';

	let { children }: { children: Snippet } = $props();
</script>

<svelte:head>
	<link
		rel="alternate"
		type="application/rss+xml"
		title="Ümit Demir"
		href="{website.siteUrl}/rss.xml"
	/>
</svelte:head>

<Analytics />

<SiteHeader />
{@render children()}
<SiteFooter />

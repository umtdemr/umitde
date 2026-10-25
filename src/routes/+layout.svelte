<script lang="ts">
	import type { Snippet } from 'svelte';
	import { inject } from '@vercel/analytics';
	import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';
	import Analytics from '$lib/analytics.svelte';
	import SiteHeader from '$lib/components/SiteHeader.svelte';
	import SiteFooter from '$lib/components/SiteFooter.svelte';
	import '../app.css';

	let { children }: { children: Snippet } = $props();

	inject(); // vercel web analytics
	injectSpeedInsights(); // vercel speed insights
</script>

<Analytics />

<SiteHeader />
{@render children()}
<SiteFooter />

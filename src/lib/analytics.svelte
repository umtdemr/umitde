<script lang="ts">
	import { page } from '$app/state';
	import { onMount } from 'svelte';

	// gtag.js is large; fetch it once the page has loaded and gone idle so it doesn't compete with
	// the first paint. gtag() calls made before then queue in dataLayer
	onMount(() => {
		const inject = () => {
			const script = document.createElement('script');
			script.async = true;
			script.src = 'https://www.googletagmanager.com/gtag/js?id=G-JZ2W4JBGP1';
			document.head.append(script);
		};
		const whenIdle = () =>
			'requestIdleCallback' in window ? requestIdleCallback(inject) : setTimeout(inject, 1);

		if (document.readyState === 'complete') whenIdle();
		else window.addEventListener('load', whenIdle, { once: true });
	});

	$effect(() => {
		const pagePath = page.url.pathname;
		window.gtag?.('config', 'G-JZ2W4JBGP1', {
			page_title: document.title,
			page_path: pagePath
		});
	});
</script>

<svelte:head>
	<script>
		window.dataLayer = window.dataLayer || [];
		function gtag() {
			dataLayer.push(arguments);
		}
		gtag('js', new Date());

		gtag('config', 'G-JZ2W4JBGP1');
	</script>
</svelte:head>

<script lang="ts">
	import { page } from '$app/state';

	$effect(() => {
		const pagePath = page.url.pathname;
		window.gtag?.('config', 'G-JZ2W4JBGP1', {
			page_title: document.title,
			page_path: pagePath
		});
	});
</script>

<svelte:head>
	<script async src="https://www.googletagmanager.com/gtag/js?id=G-JZ2W4JBGP1"></script>
	<script>
		window.dataLayer = window.dataLayer || [];
		function gtag() {
			dataLayer.push(arguments);
		}
		gtag('js', new Date());

		gtag('config', 'G-JZ2W4JBGP1');
	</script>
</svelte:head>

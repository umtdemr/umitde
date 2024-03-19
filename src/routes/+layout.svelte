<script>
	import { page } from "$app/stores";
	import Header from '$lib/components/Header.svelte'
	import './../_reset.scss';
	import './../styles.scss';

	let showBg;
	$: showBg = $page.url.pathname === "/";
</script>

<div class="app">
	<Header showBg={showBg} />

	<main>
		<div class="container">
			<slot />
		</div>
	</main>

	<footer>
		<p>visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to learn SvelteKit</p>
	</footer>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		justify-content: space-between;
	}

	main {
	}

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 12px;
	}

	footer a {
		font-weight: bold;
	}

	@media (min-width: 480px) {
		footer {
			padding: 12px 0;
		}
	}
</style>

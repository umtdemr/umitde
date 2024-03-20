<script>
	import { page } from "$app/stores";
	import Header from '$lib/components/Header.svelte'
	import './../_reset.scss';
	import './../styles.scss';
	import Logo from "$lib/components/Logo.svelte";

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
		<div class="container">
			<div class="footer__wrapper">
				<Logo />
			</div>
		</div>
	</footer>
</div>

<style lang="scss">
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		justify-content: space-between;
	}

	main {
	}

	footer {
		border-top: 3px solid #302D2D;
		.footer__wrapper {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			padding: 50px 0;
		}
	}

</style>

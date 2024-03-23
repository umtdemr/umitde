<script>
	import { page } from "$app/stores";
	import Header from '$lib/components/Header.svelte'
	import './../_reset.scss';
	import './../styles.scss';
	import Logo from "$lib/components/Logo.svelte";
	import LinkedinIcon from "$lib/components/icons/LinkedinIcon.svelte";
	import GithubIcon from "$lib/components/icons/GithubIcon.svelte";
	import Modal from "$lib/components/Modal/Modal.svelte";
	import SearchModal from "$lib/components/SearchModal/SearchModal.svelte";

	let showBg;
	$: showBg = $page.url.pathname === "/";

	let isSearchModalActive = false;

	function handleChangeSearchModalStatus(e) {
		isSearchModalActive = e.detail.status;
	}
</script>

<div class="app">
	<Header showBg={showBg} on:changeSearchModalStatus={handleChangeSearchModalStatus} />

	<main>
		<div class="container">
			<slot />
		</div>
	</main>

	<footer>
		<div class="container">
			<div class="footer__wrapper">
				<Logo />
				<div class="footer__socials">
					<a href="https://www.linkedin.com/in/umtdemr/" target="_blank" rel="noopener noreferrer">
						<LinkedinIcon />
					</a>
					<a href="https://github.com/umtdemr" target="_blank" rel="noopener noreferrer">
						<GithubIcon />
					</a>
				</div>
			</div>
		</div>
	</footer>
	{#if isSearchModalActive}
		<SearchModal  on:changeSearchModalStatus={handleChangeSearchModalStatus} />
	{/if}
</div>

<style lang="scss">
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		justify-content: space-between;
	}

	main {
		flex-grow: 1;
		padding-top: 100px;
	}

	footer {
		border-top: 3px solid #302D2D;
		.footer__wrapper {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			padding: 50px 0;
		}
		.footer__socials {
			display: flex;
			gap: 13px;
		}
	}

</style>

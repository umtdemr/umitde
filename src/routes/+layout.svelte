<script>
	import { page } from "$app/stores";
	import Header from '$lib/components/Header.svelte'
	import './../_reset.scss';
	import './../styles.scss';
	import Logo from "$lib/components/Logo.svelte";
	import LinkedinIcon from "$lib/components/icons/LinkedinIcon.svelte";
	import GithubIcon from "$lib/components/icons/GithubIcon.svelte";
	import SearchModal from "$lib/components/SearchModal/SearchModal.svelte";

	let showBg;
	$: showBg = $page.url.pathname === "/";

	let isSearchModalActive = false;

	function handleChangeSearchModalStatus(e) {
		isSearchModalActive = e.detail.status;
	}
</script>

<div class="app" class:notHome={!showBg}>
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
					<a href="https://www.linkedin.com/in/umtdemr/" target="_blank" rel="noopener noreferrer" aria-label="Ümit Demir's Linkedin Profile">
						<LinkedinIcon />
					</a>
					<a href="https://github.com/umtdemr" target="_blank" rel="noopener noreferrer" aria-label="Ümit Demir's Github Profile">
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
		&.notHome {
			background: linear-gradient(180deg, var(--color-blue) -340px, #202124 100px);
		}
	}

	main {
		flex-grow: 1;
		padding: 100px 0;
		@media screen and (max-width: 790px) {
			padding: 45px 0;
		}
	}

	footer {
		border-top: 3px solid #302D2D;
		.footer__wrapper {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			padding: 30px 0;
		}
		.footer__socials {
			display: flex;
			gap: 13px;
		}
	}

</style>

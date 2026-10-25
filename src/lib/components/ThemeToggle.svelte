<script lang="ts">
	import { applyTheme, hasStoredTheme, readTheme, watchSystemTheme, type Theme } from '$lib/theme';

	// null until mounted: the prerendered HTML can't know the visitor's theme
	let theme = $state<Theme | null>(null);
	let stopFollowingSystem: (() => void) | undefined;

	$effect(() => {
		theme = readTheme();
		if (hasStoredTheme()) return;
		stopFollowingSystem = watchSystemTheme((next) => {
			theme = next;
			applyTheme(next, false);
		});
		return () => stopFollowingSystem?.();
	});

	const label = $derived(
		theme === null
			? 'Toggle dark theme'
			: theme === 'dark'
				? 'Switch to light theme'
				: 'Switch to dark theme'
	);

	function toggle() {
		const next: Theme = (theme ?? readTheme()) === 'dark' ? 'light' : 'dark';
		stopFollowingSystem?.();
		stopFollowingSystem = undefined;
		theme = next;
		applyTheme(next, true);
	}
</script>

<!-- both icons are rendered; CSS picks one from data-theme so the static HTML is right before hydration -->
<button type="button" aria-label={label} onclick={toggle}>
	<svg
		class="sun"
		aria-hidden="true"
		width="16"
		height="16"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width="1.8"
		stroke-linecap="round"
	>
		<circle cx="12" cy="12" r="4"></circle>
		<path
			d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"
		></path>
	</svg>
	<svg
		class="moon"
		aria-hidden="true"
		width="16"
		height="16"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width="1.8"
		stroke-linejoin="round"
	>
		<path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z"></path>
	</svg>
</button>

<style>
	button {
		width: 44px;
		height: 44px;
		margin-right: -12px;
		padding: 0;
		border: 0;
		background: transparent;
		color: var(--muted);
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
	}

	button:hover {
		color: var(--accent);
	}

	.sun {
		display: none;
	}

	:global([data-theme='dark']) .sun {
		display: block;
	}

	:global([data-theme='dark']) .moon {
		display: none;
	}
</style>

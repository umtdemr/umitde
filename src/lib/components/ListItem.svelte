<script lang="ts">
	type Props = {
		href: string;
		/** mono column: a date or a tag */
		label: string;
		title: string;
		/** muted text after the title */
		suffix?: string;
		/** renders the label as <time> */
		datetime?: string;
	};

	let { href, label, title, suffix, datetime }: Props = $props();
</script>

<a class="item" {href}>
	{#if datetime}
		<time class="label mono" {datetime}>{label}</time>
	{:else}
		<span class="label mono">{label}</span>
	{/if}
	<span class="t">
		{title}
		{#if suffix}<span class="suffix">{suffix}</span>{/if}
	</span>
</a>

<style>
	.item {
		display: grid;
		grid-template-columns: 96px 1fr;
		gap: 16px;
		align-items: baseline;
		padding: 10px 0;
	}

	.item:hover .t {
		color: var(--accent);
	}

	.label {
		font-size: 13px;
		color: var(--muted);
	}

	.t {
		font-size: 18px;
	}

	.suffix {
		color: var(--muted);
	}

	@media (max-width: 560px) {
		.item {
			grid-template-columns: 1fr;
			gap: 2px;
		}
	}
</style>

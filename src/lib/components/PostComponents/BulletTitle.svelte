<script lang="ts">
	let { text, htmlTag }: { text: string; htmlTag: string } = $props();
</script>

<svelte:element this={htmlTag} class="bullet-title">{text}</svelte:element>

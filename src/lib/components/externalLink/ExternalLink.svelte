<script lang="ts">
	let { link, text }: { link: string; text: string } = $props();
</script>

<a href={link} rel="nofollow noopener" target="_blank">{text}</a>

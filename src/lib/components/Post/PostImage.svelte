<script lang="ts">
	import type { ImageData } from '$lib/types';

	let { data }: { data: ImageData & { alt: string } } = $props();
</script>

<picture>
	{#each data.sources as source (source.type)}
		<source srcset={source.srcset} type={source.type} />
	{/each}
	<img
		alt={data.alt}
		loading="lazy"
		decoding="async"
		width={data.width}
		height={data.height}
		src={data.src}
	/>
</picture>

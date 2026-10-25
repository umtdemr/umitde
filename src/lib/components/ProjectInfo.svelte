<script lang="ts">
	import type { Project } from '$lib/data/projects';

	let { project }: { project: Project } = $props();

	const external = $derived(project.href?.startsWith('http') ?? false);
</script>

<div class="info">
	{#if project.href}
		<a class="name" href={project.href}>{project.name}{external ? ' ↗' : ''}</a>
	{:else}
		<span class="name">{project.name}</span>
	{/if}
	<span class="description">{project.description}</span>
</div>

<style>
	.info {
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.name {
		font-size: 20px;
		font-weight: 600;
	}

	.description {
		font-size: 15px;
		color: var(--text2);
	}
</style>

<script lang="ts">
	import { onMount } from 'svelte';
	import { useTimers } from '../timers';

	let { cb, ms, clearAt }: { cb: () => void; ms: number; clearAt?: number } = $props();

	const timers = useTimers();

	onMount(() => {
		timers.later(cb, ms);
		if (clearAt !== undefined) timers.later(timers.clear, clearAt);
	});
</script>

<script lang="ts">
	import type { ToyProps } from '../types';

	let { info }: ToyProps = $props();
</script>

<p>loaded</p>
{@render info?.()}

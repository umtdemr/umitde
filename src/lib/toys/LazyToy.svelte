<script lang="ts">
	import type { Component, Snippet } from 'svelte';
	import { toyLoaders } from './registry';
	import type { ToyName, ToyProps } from './types';
	import './toys.css';

	type Props = {
		name: ToyName;
		/** placeholder aspect ratio, e.g. '4 / 3'; match the toy's stage to avoid a jump */
		aspect?: string;
		info?: Snippet;
	};

	let { name, aspect, info }: Props = $props();

	let Toy = $state<Component<ToyProps> | null>(null);
	let placeholder = $state<HTMLElement>();

	$effect(() => {
		const loader = toyLoaders[name];
		if (!loader || !placeholder) return;

		let cancelled = false;
		const load = () =>
			loader().then((module) => {
				if (!cancelled) Toy = module.default;
			});

		if (typeof IntersectionObserver === 'undefined') {
			load();
			return () => {
				cancelled = true;
			};
		}

		// start fetching a little before the toy is visible
		const observer = new IntersectionObserver(
			(entries) => {
				if (!entries.some((entry) => entry.isIntersecting)) return;
				observer.disconnect();
				load();
			},
			{ rootMargin: '200px' }
		);
		observer.observe(placeholder);
		return () => {
			cancelled = true;
			observer.disconnect();
		};
	});
</script>

{#if Toy}
	<Toy {info} />
{:else}
	<!-- the project text is rendered here so it is in the prerendered HTML before the toy loads -->
	<div
		bind:this={placeholder}
		class="toy-stage"
		style:aspect-ratio={aspect}
		aria-hidden="true"
	></div>
	{@render info?.()}
{/if}

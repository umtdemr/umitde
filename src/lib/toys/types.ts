import type { Component, Snippet } from 'svelte';

export type ToyName = 'eskiz' | 'spor-cli' | 'person-alarm' | 'mimic-robot' | 'smile-mirror';

export type ToyProps = {
	/** project title and description; each toy places it in its own layout */
	info?: Snippet;
};

export type ToyLoader = () => Promise<{ default: Component<ToyProps> }>;

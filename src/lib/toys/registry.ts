import type { ToyLoader, ToyName } from './types';

// each toy is its own chunk, fetched by LazyToy when it scrolls near the viewport
export const toyLoaders: Partial<Record<ToyName, ToyLoader>> = {
	eskiz: () => import('./EskizBoard.svelte'),
	'spor-cli': () => import('./SporCli.svelte'),
	'person-alarm': () => import('./PersonAlarm.svelte'),
	'mimic-robot': () => import('./MimicRobot.svelte')
};

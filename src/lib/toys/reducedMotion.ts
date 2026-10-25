import { MediaQuery } from 'svelte/reactivity';

// app.css already zeroes CSS transitions under this query; toys read it to skip effects
// that aren't transitions (e.g. the smile mirror's flash)
export const reducedMotion = new MediaQuery('(prefers-reduced-motion: reduce)');

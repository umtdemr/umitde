import { describe, expect, it } from 'vitest';
import { toyLoaders } from '$lib/toys/registry';
import { projects } from './projects';

describe('projects', () => {
	it('has unique slugs', () => {
		const slugs = projects.map((p) => p.slug);
		expect(new Set(slugs).size).toBe(slugs.length);
	});

	it('has exactly one wide card', () => {
		expect(projects.filter((p) => p.kind === 'toy' && p.wide).map((p) => p.slug)).toEqual([
			'eskiz'
		]);
	});

	it('features three projects on the home page, in order', () => {
		expect(projects.filter((p) => p.home).map((p) => p.slug)).toEqual([
			'eskiz',
			'spor-istanbul-cli',
			'person-alarm'
		]);
	});

	it('gives every playable project a toy', () => {
		for (const p of projects) {
			if (p.kind === 'toy') expect(p.toy, p.slug).toBeTruthy();
		}
	});

	it('keeps the works page order from the mockup', () => {
		expect(projects.map((p) => `${p.kind}:${p.slug}`)).toEqual([
			'toy:eskiz',
			'toy:spor-istanbul-cli',
			'toy:person-alarm',
			'toy:mimic-robot',
			'toy:smile-mirror',
			'also:apeiros',
			'also:hierapi',
			'also:petra-coffee',
			'also:umitde'
		]);
	});

	it('has a registered loader for every toy', () => {
		const used = projects.flatMap((p) => (p.kind === 'toy' ? [p.toy] : []));
		for (const name of used) {
			expect(toyLoaders[name], name).toBeTypeOf('function');
		}
	});
});

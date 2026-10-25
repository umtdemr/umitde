import { describe, expect, it } from 'vitest';
import { getPosts } from './posts.server';

describe('getPosts', () => {
	it('reads the real posts, newest first', () => {
		expect(getPosts().map((p) => p.slug)).toEqual([
			'i-built-a-whiteboard-accidentally',
			'handling-dynamic-json-payloads-in-go',
			'i-switched-to-wezterm',
			'canvas-optimization-with-tile-based-caching',
			'a-new-face-a-new-identity'
		]);
	});
});

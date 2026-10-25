import { describe, expect, it } from 'vitest';
import { connector } from './eskizGeometry';

describe('connector', () => {
	it('runs between the facing edges of two notes, leaving a gap', () => {
		// centres at (16, 50) and (80, 50) in the 160×100 view box; notes are 16 wide
		const c = connector({ x: 10, y: 50 }, { x: 50, y: 50 });
		expect(c).not.toBeNull();
		expect(c!.x1).toBe(26);
		expect(c!.y1).toBe(50);
		// the line stops where the arrow head starts; the tip sits 2 units before the note edge
		expect(c!.x2).toBe(66.5);
		expect(c!.head.split(' ')[0]).toBe('70,50');
	});

	it('handles diagonal and reversed directions', () => {
		const c = connector({ x: 70, y: 80 }, { x: 20, y: 20 })!;
		expect(c.x1).toBeLessThan(70 * 1.6);
		expect(c.y1).toBeLessThan(80);
		expect(c.x2).toBeGreaterThan(20 * 1.6);
		expect(c.y2).toBeGreaterThan(20);
	});

	it('disappears when the notes overlap or touch', () => {
		expect(connector({ x: 10, y: 50 }, { x: 15, y: 50 })).toBeNull();
		expect(connector({ x: 30, y: 30 }, { x: 30, y: 30 })).toBeNull();
	});
});

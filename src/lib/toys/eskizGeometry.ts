// The board is always 16:10, so a 160×100 view box maps note percentages without distortion:
// x% → x * 1.6, y% → y. A note is 10% of the board wide (16 units) and square.
export const VIEW_BOX = '0 0 160 100';
const X_SCALE = 1.6;
const NOTE_HALF = 8;
const GAP = 2;
const HEAD_LENGTH = 3.5;
const HEAD_HALF_WIDTH = 2;

type Point = { x: number; y: number };

export type Connector = { x1: number; y1: number; x2: number; y2: number; head: string };

const round = (n: number) => Math.round(n * 100) / 100;

/** Arrow from note `a` to note `b` (centres in board %), or null when they overlap. */
export function connector(a: Point, b: Point): Connector | null {
	const ax = a.x * X_SCALE;
	const bx = b.x * X_SCALE;
	const dx = bx - ax;
	const dy = b.y - a.y;
	const length = Math.hypot(dx, dy);
	const longest = Math.max(Math.abs(dx), Math.abs(dy));
	if (longest === 0) return null;

	// along the centre line, a square note's edge sits at NOTE_HALF / longest; add the gap on top
	const inset = NOTE_HALF / longest + GAP / length;
	if (inset * 2 + HEAD_LENGTH / length >= 1) return null;

	const ux = dx / length;
	const uy = dy / length;
	const tipX = bx - dx * inset;
	const tipY = b.y - dy * inset;
	const baseX = tipX - ux * HEAD_LENGTH;
	const baseY = tipY - uy * HEAD_LENGTH;
	const head = [
		[tipX, tipY],
		[baseX - uy * HEAD_HALF_WIDTH, baseY + ux * HEAD_HALF_WIDTH],
		[baseX + uy * HEAD_HALF_WIDTH, baseY - ux * HEAD_HALF_WIDTH]
	]
		.map(([x, y]) => `${round(x)},${round(y)}`)
		.join(' ');

	return {
		x1: round(ax + dx * inset),
		y1: round(a.y + dy * inset),
		x2: round(baseX),
		y2: round(baseY),
		head
	};
}

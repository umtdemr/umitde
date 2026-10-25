<script lang="ts">
	import { connector, VIEW_BOX } from './eskizGeometry';
	import type { ToyProps } from './types';

	let { info }: ToyProps = $props();
	const keysHintId = $props.id();

	const COLORS = [
		{ name: 'Yellow', value: '#FFE48A' },
		{ name: 'Peach', value: '#FFC2A8' },
		{ name: 'Mint', value: '#B9E3C6' },
		{ name: 'Blue', value: '#BFD3FF' }
	];
	// notes are 10% of the board wide, so keep their centre this far from the edges
	const MIN = 5;
	const MAX = 95;
	const DRAG_THRESHOLD_PX = 3;
	const KEY_STEP = 2;
	const KEY_STEP_LARGE = 10;

	type Note = { id: number; x: number; y: number; color: number; rotation: number };

	let notes = $state<Note[]>([
		{ id: 0, x: 24, y: 42, color: 0, rotation: -4 },
		{ id: 1, x: 46, y: 62, color: 1, rotation: 3 },
		{ id: 2, x: 70, y: 38, color: 2, rotation: -2 }
	]);
	let selectedId = $state<number | null>(null);
	let draggingId = $state<number | null>(null);
	let board = $state<HTMLElement>();

	const selected = $derived(notes.find((note) => note.id === selectedId));

	// arrows between notes, by note id; they follow the notes as they are dragged
	const CONNECTIONS: [number, number][] = [[0, 1]];
	const arrows = $derived(
		CONNECTIONS.map(([from, to]) => {
			const a = notes.find((note) => note.id === from);
			const b = notes.find((note) => note.id === to);
			return a && b ? connector(a, b) : null;
		}).filter((arrow) => arrow !== null)
	);

	// not reactive: only the pointer handlers read it
	let drag: {
		note: Note;
		pointerId: number;
		startX: number;
		startY: number;
		noteX: number;
		noteY: number;
		moved: boolean;
	} | null = null;

	const clamp = (value: number) => Math.min(MAX, Math.max(MIN, value));

	function startDrag(event: PointerEvent, note: Note) {
		selectedId = note.id;
		drag = {
			note,
			pointerId: event.pointerId,
			startX: event.clientX,
			startY: event.clientY,
			noteX: note.x,
			noteY: note.y,
			moved: false
		};
		(event.currentTarget as HTMLElement).setPointerCapture?.(event.pointerId);
	}

	function moveDrag(event: PointerEvent) {
		if (!drag || event.pointerId !== drag.pointerId || !board) return;
		const dx = event.clientX - drag.startX;
		const dy = event.clientY - drag.startY;
		if (!drag.moved && Math.hypot(dx, dy) <= DRAG_THRESHOLD_PX) return;
		drag.moved = true;
		draggingId = drag.note.id;
		const rect = board.getBoundingClientRect();
		drag.note.x = clamp(drag.noteX + (dx / rect.width) * 100);
		drag.note.y = clamp(drag.noteY + (dy / rect.height) * 100);
	}

	function endDrag(event: PointerEvent) {
		if (!drag || event.pointerId !== drag.pointerId) return;
		// a real drop gets a fresh tilt, like slapping a sticky note down
		if (drag.moved && event.type === 'pointerup') {
			drag.note.rotation = Math.round(Math.random() * 10 - 5);
		}
		drag = null;
		draggingId = null;
	}

	function onKeydown(event: KeyboardEvent, note: Note) {
		if (event.key === 'Escape') {
			selectedId = null;
			return;
		}
		const step = event.shiftKey ? KEY_STEP_LARGE : KEY_STEP;
		const moves: Record<string, [number, number]> = {
			ArrowLeft: [-step, 0],
			ArrowRight: [step, 0],
			ArrowUp: [0, -step],
			ArrowDown: [0, step]
		};
		const move = moves[event.key];
		if (!move) return;
		event.preventDefault();
		selectedId = note.id;
		note.x = clamp(note.x + move[0]);
		note.y = clamp(note.y + move[1]);
	}

	function onBoardPointerdown(event: PointerEvent) {
		if (event.target === event.currentTarget) selectedId = null;
	}
</script>

<div
	bind:this={board}
	class="toy-stage toy-dots board"
	role="group"
	aria-label="Sticky note board"
	onpointerdown={onBoardPointerdown}
>
	<svg class="arrows" viewBox={VIEW_BOX} aria-hidden="true">
		{#each arrows as arrow, index (index)}
			<g data-connector>
				<line x1={arrow.x1} y1={arrow.y1} x2={arrow.x2} y2={arrow.y2} />
				<polygon points={arrow.head} />
			</g>
		{/each}
	</svg>

	{#each notes as note (note.id)}
		{@const isSelected = note.id === selectedId}
		<button
			type="button"
			class="note"
			class:selected={isSelected}
			class:dragging={note.id === draggingId}
			data-note
			aria-label="{COLORS[note.color].name} note"
			aria-pressed={isSelected}
			aria-describedby={keysHintId}
			style:left="{note.x}%"
			style:top="{note.y}%"
			style:transform="translate(-50%, -50%) rotate({note.rotation}deg)"
			style:background={COLORS[note.color].value}
			onpointerdown={(event) => startDrag(event, note)}
			onpointermove={moveDrag}
			onpointerup={endDrag}
			onpointercancel={endDrag}
			onclick={() => (selectedId = note.id)}
			onkeydown={(event) => onKeydown(event, note)}
		>
			<span class="line"></span>
			<span class="line short"></span>
		</button>
	{/each}

	{#if selected}
		<!-- above the note, or below it near the top edge. A note is 10% of the 16:10 board wide,
		     so half of it is 8% of the board height -->
		<div
			class="colors"
			class:below={selected.y < 30}
			role="toolbar"
			aria-label="Note colour"
			style:left="{Math.min(88, Math.max(12, selected.x))}%"
			style:top={selected.y < 30
				? `calc(${selected.y}% + 8% + 10px)`
				: `calc(${selected.y}% - 8% - 10px)`}
		>
			{#each COLORS as color, index (color.name)}
				<button
					type="button"
					class="swatch"
					aria-label={color.name}
					aria-pressed={selected.color === index}
					style:background={color.value}
					onclick={() => (selected.color = index)}
				></button>
			{/each}
		</div>
	{/if}

	<span class="hint mono">drag a note · click to recolor</span>
	<span id={keysHintId} class="sr-only">
		Arrow keys move the note, Shift moves it further, Escape deselects.
	</span>
</div>

{@render info?.()}

<style>
	.board {
		aspect-ratio: 16 / 10;
		user-select: none;
	}

	.note {
		position: absolute;
		z-index: 1;
		width: 10%;
		aspect-ratio: 1 / 1;
		padding: 0;
		border: 0;
		border-radius: 4px;
		box-shadow: 0 3px 8px rgba(0, 0, 0, 0.12);
		cursor: grab;
		touch-action: none;
		transition:
			transform 0.15s ease,
			box-shadow 0.15s ease;
	}

	.note.selected {
		z-index: 2;
		outline: 2px solid var(--accent);
		outline-offset: 3px;
	}

	.note.dragging {
		cursor: grabbing;
		box-shadow: 0 10px 22px rgba(0, 0, 0, 0.18);
	}

	.arrows {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
		color: var(--muted);
	}

	.arrows line {
		stroke: currentColor;
		stroke-width: 1.5;
		stroke-linecap: round;
		vector-effect: non-scaling-stroke;
	}

	.arrows polygon {
		fill: currentColor;
	}

	.line {
		position: absolute;
		left: 14%;
		right: 14%;
		top: 26%;
		height: 2px;
		background: rgba(22, 22, 26, 0.22);
		border-radius: 2px;
	}

	.line.short {
		right: 34%;
		top: 42%;
	}

	.colors {
		position: absolute;
		z-index: 3;
		display: flex;
		gap: 6px;
		padding: 6px;
		border-radius: 10px;
		background: var(--paper);
		border: 1px solid var(--rule);
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
		transform: translate(-50%, -100%);
	}

	.colors.below {
		transform: translate(-50%, 0);
	}

	.swatch {
		width: 24px;
		height: 24px;
		padding: 0;
		border-radius: 6px;
		border: 1px solid rgba(0, 0, 0, 0.12);
		cursor: pointer;
	}

	.swatch[aria-pressed='true'] {
		outline: 2px solid var(--accent);
		outline-offset: 2px;
	}

	.hint {
		position: absolute;
		right: 16px;
		bottom: 14px;
		font-size: 12px;
		color: var(--muted);
		pointer-events: none;
	}

	.sr-only {
		position: absolute;
		width: 1px;
		height: 1px;
		overflow: hidden;
		clip-path: inset(50%);
		white-space: nowrap;
	}
</style>

<script lang="ts">
	import type { ToyProps } from './types';

	let { info }: ToyProps = $props();

	type Arm = { upper: number; fore: number };
	type Pose = { label: string; left: Arm; right: Arm };

	// absolute SVG angles (0 = pointing right, 90 = down) for the human's viewer-left and right arms.
	// The left arm stays within 105–250 so it never swings through the body.
	const POSES: Record<string, Pose> = {
		rest: { label: 'rest', left: { upper: 105, fore: 95 }, right: { upper: 75, fore: 85 } },
		wave: { label: 'wave', left: { upper: 105, fore: 95 }, right: { upper: -15, fore: -75 } },
		up: { label: 'arms up', left: { upper: 225, fore: 250 }, right: { upper: -45, fore: -70 } },
		t: { label: 't-pose', left: { upper: 180, fore: 180 }, right: { upper: 0, fore: 0 } }
	};
	const UPPER_LENGTH = 26;
	const ROBOT_DELAY = '0.3s';

	let poseKey = $state('rest');
	const pose = $derived(POSES[poseKey]);

	// the robot faces you, so its left arm copies your right one, reflected
	const mirror = (arm: Arm): Arm => ({ upper: 180 - arm.upper, fore: 180 - arm.fore });
	const robotLeft = $derived(mirror(pose.right));
	const robotRight = $derived(mirror(pose.left));
</script>

{#snippet arm(name: string, angles: Arm, robot: boolean)}
	<g
		class="arm"
		data-arm="{name}-upper"
		style:transform="rotate({angles.upper}deg)"
		style:transition-delay={robot ? ROBOT_DELAY : undefined}
	>
		{#if robot}
			<rect class="wood" x="2" y="-4" width="24" height="8" rx="3" />
		{:else}
			<line class="stick" x1="0" y1="0" x2={UPPER_LENGTH} y2="0" />
		{/if}
		<g
			class="arm"
			data-arm="{name}-fore"
			style:transform="translate({UPPER_LENGTH}px, 0px) rotate({angles.fore - angles.upper}deg)"
			style:transition-delay={robot ? ROBOT_DELAY : undefined}
		>
			{#if robot}
				<rect class="wood" x="2" y="-3.5" width="20" height="7" rx="3" />
				<ellipse class="wood" cx="26" cy="0" rx="4" ry="3" />
				<circle class="pin" cx="0" cy="0" r="2.2" />
			{:else}
				<line class="stick" x1="0" y1="0" x2="24" y2="0" />
			{/if}
		</g>
	</g>
{/snippet}

<div class="toy-stage">
	<svg viewBox="0 0 320 240" role="img" aria-label="You and the robot, pose: {pose.label}">
		<line class="floor" x1="30" y1="178" x2="290" y2="178" />

		<!-- you -->
		<g class="human">
			<circle class="stick" cx="80" cy="50" r="11" />
			<line class="stick" x1="80" y1="61" x2="80" y2="118" />
			<line class="stick" x1="80" y1="118" x2="68" y2="174" />
			<line class="stick" x1="80" y1="118" x2="92" y2="174" />
			<g transform="translate(80 74)">{@render arm('human-left', pose.left, false)}</g>
			<g transform="translate(80 74)">{@render arm('human-right', pose.right, false)}</g>
		</g>

		<!-- kinect, looking at you -->
		<line class="beam" x1="140" y1="112" x2="98" y2="92" />
		<g class="kinect">
			<rect x="140" y="107" width="40" height="10" rx="3" />
			<rect x="154" y="117" width="12" height="4" rx="1" />
			<circle class="ir" cx="148" cy="112" r="1.6" />
			<circle class="lens" cx="160" cy="112" r="2.2" />
			<circle class="lens" cx="171" cy="112" r="1.6" />
		</g>

		<!-- the wooden robot -->
		<g class="robot">
			<rect class="wood" x="235" y="54" width="10" height="9" rx="2" />
			<ellipse class="wood" cx="240" cy="42" rx="9" ry="12" />
			<polygon class="wood" points="222,62 258,62 247,116 233,116" />
			<rect class="wood" x="231" y="114" width="18" height="9" rx="3" />
			<rect class="wood" x="231" y="124" width="8" height="24" rx="3" />
			<rect class="wood" x="241" y="124" width="8" height="24" rx="3" />
			<rect class="wood" x="231.5" y="150" width="7" height="22" rx="3" />
			<rect class="wood" x="241.5" y="150" width="7" height="22" rx="3" />
			<ellipse class="wood" cx="233" cy="175" rx="7" ry="3" />
			<ellipse class="wood" cx="247" cy="175" rx="7" ry="3" />
			<g transform="translate(222 66)">{@render arm('robot-left', robotLeft, true)}</g>
			<g transform="translate(258 66)">{@render arm('robot-right', robotRight, true)}</g>
			<circle class="wood" cx="222" cy="66" r="6" />
			<circle class="wood" cx="258" cy="66" r="6" />
		</g>

		<text x="80" y="194">you</text>
		<text x="160" y="134">kinect</text>
		<text x="240" y="194">robot</text>
	</svg>

	<div class="poses" role="group" aria-label="Pick a pose">
		{#each Object.entries(POSES) as [key, option] (key)}
			<button
				type="button"
				class="toy-btn pose"
				aria-pressed={poseKey === key}
				onclick={() => (poseKey = key)}>{option.label}</button
			>
		{/each}
	</div>
</div>

{@render info?.()}

<style>
	svg {
		display: block;
		width: 100%;
		height: 100%;
	}

	.floor {
		stroke: var(--stage-border);
		stroke-width: 1;
	}

	.stick {
		fill: none;
		stroke: var(--ink);
		stroke-width: 3;
		stroke-linecap: round;
	}

	.wood {
		fill: #d9a877;
		stroke: #b07a45;
		stroke-width: 1.2;
	}

	.pin {
		fill: #a8a9ad;
	}

	.arm {
		transition: transform 0.5s ease;
	}

	.beam {
		stroke: var(--stage-border);
		stroke-width: 1.5;
		stroke-dasharray: 4 5;
	}

	.kinect rect {
		fill: #1d1d20;
	}

	/* the black bar would vanish into the dark stage */
	:global([data-theme='dark']) .kinect rect {
		stroke: #4a4a52;
		stroke-width: 1;
	}

	.kinect .ir {
		fill: #c0392b;
	}

	.kinect .lens {
		fill: #55565c;
	}

	text {
		font-family: 'JetBrains Mono', ui-monospace, monospace;
		font-size: 9px;
		fill: var(--muted);
		text-anchor: middle;
	}

	.poses {
		position: absolute;
		left: 50%;
		bottom: 10px;
		display: flex;
		gap: 6px;
		transform: translateX(-50%);
	}

	.pose {
		min-height: 28px;
		padding: 4px 10px;
		font-size: 11px;
		white-space: nowrap;
	}

	.pose:not([aria-pressed='true']) {
		background: var(--paper);
	}
</style>

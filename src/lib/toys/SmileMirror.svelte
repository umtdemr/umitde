<script lang="ts">
	import { reducedMotion } from './reducedMotion';
	import { useTimers } from './timers';
	import type { ToyProps } from './types';

	let { info }: ToyProps = $props();

	const MAX_THUMBNAILS = 3;
	const NEUTRAL_MOUTH = 'M47 84 Q60 85 73 84';
	const SMILE_MOUTH = 'M46 80 Q60 94 74 80';

	const timers = useTimers();

	let smiling = $state(false);
	let flashing = $state(false);
	let shots = $state(0);

	const counter = $derived(`${shots} ${shots === 1 ? 'selfie' : 'selfies'}`);

	function smile() {
		if (smiling) return;
		smiling = true;
		// the mirror spots the smile, snaps a selfie with a flash, then you relax
		timers.later(() => {
			shots++;
			if (!reducedMotion.current) flashing = true;
		}, 550);
		timers.later(() => (flashing = false), 800);
		timers.later(() => (smiling = false), 1700);
	}
</script>

<div class="toy-stage mirror-stage">
	<svg
		viewBox="0 0 120 150"
		role="img"
		aria-label={smiling ? 'Smiling face in the mirror' : 'Neutral face in the mirror'}
	>
		<!-- arched wooden frame, like the real one -->
		<path class="frame" d="M6 146 V60 A54 54 0 0 1 114 60 V146 Z" />
		<path class="glass" d="M13 140 V60 A47 47 0 0 1 107 60 V140 Z" />

		<circle class="face" cx="60" cy="70" r="30" />
		<circle class="feature" cx="49" cy="64" r="2.8" />
		<circle class="feature" cx="71" cy="64" r="2.8" />
		<path class="mouth" d={smiling ? SMILE_MOUTH : NEUTRAL_MOUTH} />

		{#if smiling}
			<g class="detection" data-detection>
				<rect x="27" y="37" width="66" height="66" rx="4" />
				<text x="27" y="34">smile</text>
			</g>
		{/if}
	</svg>

	<div class="shots">
		<span class="counter mono" data-counter aria-live="polite">{counter}</span>
		{#each { length: Math.min(shots, MAX_THUMBNAILS) } as _, index (index)}
			<!-- a tiny polaroid of the same face, smiling -->
			<span class="thumb" data-shot aria-hidden="true">
				<svg viewBox="27 37 66 66">
					<circle class="face" cx="60" cy="70" r="30" />
					<circle class="feature" cx="49" cy="64" r="2.8" />
					<circle class="feature" cx="71" cy="64" r="2.8" />
					<path class="mouth" d={SMILE_MOUTH} />
				</svg>
			</span>
		{/each}
	</div>

	<button type="button" class="toy-btn primary smile" aria-disabled={smiling} onclick={smile}
		>smile</button
	>

	<span class="flash" data-flash style:opacity={flashing ? '0.85' : '0'} aria-hidden="true"></span>
</div>

{@render info?.()}

<style>
	.mirror-stage {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 24px;
		/* leave the bottom strip for the smile button */
		padding: 14px 0 50px;
	}

	svg {
		display: block;
		height: 100%;
	}

	.frame {
		fill: #a0703f;
		stroke: #7a5230;
		stroke-width: 1.5;
	}

	.glass {
		fill: var(--paper);
	}

	.face,
	.mouth {
		fill: none;
		stroke: var(--ink);
		stroke-width: 2.5;
		stroke-linecap: round;
	}

	.feature {
		fill: var(--ink);
	}

	.detection rect {
		fill: none;
		stroke: var(--accent);
		stroke-width: 1.5;
		stroke-dasharray: 3 3;
	}

	.detection text {
		font-family: 'JetBrains Mono', ui-monospace, monospace;
		font-size: 6px;
		fill: var(--accent);
	}

	.shots {
		display: flex;
		flex-direction: column;
		gap: 8px;
		min-width: 64px;
	}

	.counter {
		font-size: 11px;
		color: var(--muted);
	}

	.thumb {
		width: 52px;
		height: 40px;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 3px 3px 7px;
		border-radius: 3px;
		background: var(--paper);
		border: 1px solid var(--stage-border);
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
	}

	.thumb svg {
		height: 100%;
	}

	.flash {
		position: absolute;
		inset: 0;
		background: #fff;
		pointer-events: none;
		transition: opacity 0.25s;
	}

	.smile {
		position: absolute;
		left: 50%;
		bottom: 10px;
		min-height: 28px;
		padding: 4px 14px;
		font-size: 11px;
		transform: translateX(-50%);
	}
</style>

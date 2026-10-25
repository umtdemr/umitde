<script lang="ts">
	import { useTimers } from './timers';
	import type { ToyProps } from './types';

	let { info }: ToyProps = $props();

	// layout in % of the 4:3 camera frame, modelled on the real ESP32-CAM screenshot
	const ZONE_RIGHT = 17;
	const BOX_HALF_WIDTH = 11;
	// the frame is 400 camera units wide, so 1% = 4 units
	const UNITS_PER_PERCENT = 4;
	const LIMIT = 60;
	// the slider spans exactly the lane the box centre can walk, so the person stays under the pointer
	const MIN_X = 28;
	const MAX_X = 90;

	const TOAST_MS = 3000;

	const timers = useTimers();

	let x = $state(72);
	let moved = $state(false);
	let toastVisible = $state(false);

	const boxLeft = $derived(x - BOX_HALF_WIDTH);
	const distance = $derived(Math.round((boxLeft - ZONE_RIGHT) * UNITS_PER_PERCENT));
	const alarm = $derived(distance < LIMIT);
	// the bot only writes when the limit is exceeded, and the message fades after a still moment
	const showToast = $derived(toastVisible && alarm);

	function onWalk() {
		moved = true;
		toastVisible = true;
		timers.clear();
		timers.later(() => (toastVisible = false), TOAST_MS);
	}
</script>

<div class="toy-stage camera">
	<span class="zone" aria-hidden="true"></span>

	<svg class="link" viewBox="0 0 400 300" aria-hidden="true">
		<line
			class:alarm
			x1={ZONE_RIGHT * UNITS_PER_PERCENT}
			y1="180"
			x2={boxLeft * UNITS_PER_PERCENT}
			y2="201"
		/>
	</svg>

	<span class="person" class:alarm data-person style:left="{x}%" aria-hidden="true">
		<span class="label">person</span>
		<span class="head"></span>
		<span class="body"></span>
	</span>

	<span class="corner mono" aria-hidden="true">
		{#if alarm}<span class="pill">● ALARM</span>{:else}cam-01 · esp32-cam{/if}
	</span>
	<span class="distance mono" class:alarm data-distance>d={distance}</span>

	{#if !moved}<span class="hint mono" aria-hidden="true">drag the person</span>{/if}

	<!-- notification sits under the top labels and above the person, so it hides no readings -->
	<div class="toast" class:show={showToast} role="status">
		{#if alarm}
			<span class="avatar" aria-hidden="true">PA</span>
			<span class="text">
				<span class="bot">Person Alarm</span>
				<span>limit exceeded</span>
			</span>
			<span class="time mono" aria-hidden="true">14:41</span>
		{/if}
	</div>

	<!-- invisible native slider over the walking lane: drag with the pointer, arrows on the keyboard -->
	<input
		class="walk"
		type="range"
		min={MIN_X}
		max={MAX_X}
		aria-label="Walk the person"
		aria-valuetext="{distance} units from the danger zone"
		style:left="{MIN_X}%"
		style:width="{MAX_X - MIN_X}%"
		bind:value={x}
		oninput={onWalk}
	/>
</div>

{@render info?.()}

<style>
	.camera {
		border-color: #26262b;
		background:
			linear-gradient(180deg, transparent 68%, rgba(0, 0, 0, 0.18) 68%),
			radial-gradient(ellipse at 60% 35%, #5a5e62, #35383c 75%);
	}

	.zone {
		position: absolute;
		left: 4%;
		/* below the cam-01 / ALARM label */
		top: 14%;
		width: 13%;
		height: 70%;
		background: #ff1f1f;
	}

	.link {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
	}

	.link line {
		stroke: #e9be85;
		stroke-width: 2;
		transition: stroke 0.15s;
	}

	.link line.alarm {
		stroke: #ff3b30;
	}

	.person {
		position: absolute;
		bottom: 8%;
		width: 22%;
		height: 50%;
		transform: translateX(-50%);
		border: 2px solid #e9be85;
		transition: border-color 0.15s;
	}

	.person.alarm {
		border-color: #ff3b30;
	}

	.label {
		position: absolute;
		left: -2px;
		bottom: 100%;
		padding-bottom: 2px;
		font-family: 'JetBrains Mono', ui-monospace, monospace;
		font-size: 10px;
		color: #e9be85;
	}

	.person.alarm .label {
		color: #ff3b30;
	}

	.head {
		position: absolute;
		left: 50%;
		top: 12%;
		width: 34%;
		aspect-ratio: 1 / 1;
		border-radius: 50%;
		background: rgba(233, 232, 225, 0.6);
		transform: translateX(-50%);
	}

	.body {
		position: absolute;
		left: 50%;
		top: 36%;
		bottom: 0;
		width: 64%;
		border-radius: 12px 12px 0 0;
		background: rgba(20, 20, 22, 0.75);
		transform: translateX(-50%);
	}

	.corner {
		position: absolute;
		left: 10px;
		top: 8px;
		font-size: 10px;
		color: #d8d6cf;
	}

	.pill {
		padding: 2px 8px;
		border-radius: 999px;
		background: #ff3b30;
		color: #0f0f12;
		font-weight: 500;
	}

	.distance {
		position: absolute;
		right: 10px;
		top: 6px;
		font-size: 15px;
		color: #e9be85;
	}

	.distance.alarm {
		color: #ff3b30;
	}

	.toast {
		position: absolute;
		left: 22%;
		right: 8px;
		top: 28px;
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 6px 10px;
		border-radius: 10px;
		background: rgba(33, 33, 36, 0.94);
		color: #e9e8e1;
		font-size: 12px;
		opacity: 0;
		transform: translateY(-6px);
		transition:
			opacity 0.2s ease,
			transform 0.2s ease;
		box-shadow: inset 3px 0 0 #ff3b30;
	}

	.toast.show {
		opacity: 1;
		transform: none;
	}

	.avatar {
		flex: none;
		width: 24px;
		height: 24px;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		background: #8774e1;
		color: #fff;
		font-size: 9px;
		font-weight: 600;
	}

	.text {
		flex: 1;
		display: flex;
		flex-direction: column;
		line-height: 1.25;
	}

	.bot {
		color: #a99bff;
		font-weight: 600;
	}

	.time {
		align-self: flex-end;
		font-size: 10px;
		color: #8a8a8f;
	}

	.hint {
		position: absolute;
		right: 10px;
		bottom: 6px;
		font-size: 10px;
		color: #d8d6cf;
		pointer-events: none;
	}

	.walk {
		position: absolute;
		top: 0;
		bottom: 0;
		margin: 0;
		height: 100%;
		opacity: 0;
		cursor: ew-resize;
		-webkit-appearance: none;
		appearance: none;
	}

	/* a hairline thumb keeps the pointer position and the box centre in step */
	.walk::-webkit-slider-thumb {
		-webkit-appearance: none;
		width: 1px;
		height: 100%;
	}

	.walk::-moz-range-thumb {
		width: 1px;
		height: 100%;
		border: 0;
	}

	.camera:has(.walk:focus-visible) {
		outline: 2px solid var(--accent);
		outline-offset: 2px;
	}
</style>

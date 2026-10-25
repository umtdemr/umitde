<script lang="ts">
	import { reducedMotion } from './reducedMotion';
	import { useTimers } from './timers';
	import type { ToyProps } from './types';

	let { info }: ToyProps = $props();

	type Screen = 'idle' | 'login' | 'subscription' | 'session' | 'checking' | 'found';

	// what the real CLI (github.com/umtdemr/spor-istanbul-cli) shows, trimmed to fit the card
	const DAYS = [
		{ day: 'Saturday', date: '25.05' },
		{ day: 'Sunday', date: '26.05' },
		{ day: 'Monday', date: '27.05' }
	];
	const CELLS = [
		{ count: '300 / 300', time: '08:00 - 16:30', open: false },
		{ count: '300 / 300', time: '08:00 - 16:30', open: false },
		{ count: '255 / 300', time: '06:30 - 16:30', open: true },
		{ count: '240 / 240', time: '17:00 - 21:00', open: false },
		{ count: '240 / 240', time: '17:00 - 21:00', open: false },
		{ count: '240 / 240', time: '17:00 - 21:00', open: false }
	];
	const SPINNER = ['|', '/', '-', '\\'];
	const STATUS: Record<Screen, string> = {
		idle: '',
		login: 'Logging in',
		subscription: 'Selecting a subscription',
		session: 'Selecting a session',
		checking: 'Checking for an empty spot',
		found: 'Found an empty spot. The alarm is ringing.'
	};

	const timers = useTimers();

	let screen = $state<Screen>('idle');
	let username = $state('');
	let password = $state('');
	let cursor = $state(0);
	let checks = $state(0);
	let spin = $state(0);
	let running = $state(false);

	function run() {
		if (running) return;
		timers.clear();
		username = '';
		password = '';
		cursor = 0;
		checks = 0;
		spin = 0;
		running = true;
		screen = 'login';

		let t = 300;
		for (const char of 'umit') {
			t += 110;
			timers.later(() => (username += char), t);
		}
		t += 250;
		for (let i = 0; i < 6; i++) {
			t += 80;
			timers.later(() => (password += '•'), t);
		}

		timers.later(() => (screen = 'subscription'), 1500);
		timers.later(() => (screen = 'session'), 2600);
		timers.later(() => (cursor = 3), 3000);
		timers.later(() => (cursor = 0), 3400);
		timers.later(() => {
			screen = 'checking';
			checks = 1;
		}, 4000);
		for (let tick = 1; tick <= 24; tick++) {
			timers.later(
				() => {
					if (!reducedMotion.current) spin++;
					if (tick % 4 === 0) checks++;
				},
				4000 + tick * 150
			);
		}
		timers.later(() => {
			screen = 'found';
			running = false;
		}, 7700);
	}
</script>

<div class="toy-stage terminal">
	<div class="titlebar" aria-hidden="true">
		<span class="lights"><i></i><i></i><i></i></span>
		<span>./main</span>
	</div>

	<div class="tui" aria-hidden="true">
		{#if screen === 'idle'}
			<div class="shell">
				<span class="dim">~/spor-istanbul</span>
				<span>$ ./main<span class="block"></span></span>
			</div>
		{:else}
			<div class="frame">
				{#if screen === 'login'}
					<div class="title">Login</div>
					<div class="field">
						<span>username</span>
						<span class="input">
							&gt; {#if username}{username}{:else}<span class="dim">username</span>{/if}
						</span>
					</div>
					<div class="field">
						<span>password</span>
						<span class="input">&gt; {password}</span>
					</div>
				{:else if screen === 'subscription'}
					<div class="title">Select a subscription</div>
					<div class="table">
						<span class="head">Place</span>
						<span class="head">Date</span>
						<span class="head">Left</span>
						<span class="picked">City Gym · Fitness</span>
						<span class="picked">21.05–20.07</span>
						<span class="picked">17</span>
					</div>
				{:else if screen === 'session'}
					<div class="title">Select a session</div>
					<div class="grid">
						{#each DAYS as day (day.day)}
							<span class="day">{day.day}<br />{day.date}</span>
						{/each}
						{#each CELLS as cell, index (index)}
							<span
								class="cell"
								class:open={cell.open}
								class:cursor={cursor === index}
								data-cell
								data-cursor={cursor === index ? '' : undefined}
							>
								<span>{cell.count}</span>
								<span>{cell.time}</span>
								<span>{cell.open ? 'Available' : 'Full'}</span>
							</span>
						{/each}
					</div>
				{:else if screen === 'checking'}
					<div class="status">
						<span
							><span data-spinner>{SPINNER[spin % SPINNER.length]}</span> Checking an empty spot</span
						>
						<span>Session Date: 25.05.2024 Saturday</span>
						<span>Session time: 08:00 - 16:30</span>
						<span class="gap">{checks} times checked so far</span>
					</div>
				{:else}
					<div class="status">
						<span class="ok">Found an empty spot!</span>
						<span>299 / 300 · 08:00 - 16:30</span>
						<span class="gap alarm">♪ playing the alarm</span>
					</div>
				{/if}
			</div>
			<div class="footer">↑/↓ to select</div>
		{/if}
	</div>

	{#if !running}
		<!-- big play button on the prompt; a small one in the corner once the run is over -->
		<button
			type="button"
			class="play"
			class:again={screen === 'found'}
			aria-label={screen === 'found' ? 'Run the CLI again' : 'Run the CLI'}
			onclick={run}
		>
			<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg>
			{#if screen === 'found'}<span>again</span>{/if}
		</button>
	{/if}

	<span class="sr-only" aria-live="polite">{STATUS[screen]}</span>
</div>

{@render info?.()}

<style>
	.terminal {
		display: flex;
		flex-direction: column;
		background: #011627;
		border-color: #26262b;
		color: #82aaff;
		font-family: 'JetBrains Mono', ui-monospace, monospace;
		font-size: 11px;
		line-height: 1.4;
	}

	.titlebar {
		position: relative;
		flex: none;
		display: flex;
		justify-content: center;
		padding: 4px 0;
		background: #1d2733;
		color: #a7b0bb;
		font-size: 10px;
	}

	.lights {
		position: absolute;
		left: 8px;
		top: 50%;
		display: flex;
		gap: 5px;
		transform: translateY(-50%);
	}

	.lights i {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: #ff5f57;
	}

	.lights i:nth-child(2) {
		background: #febc2e;
	}

	.lights i:nth-child(3) {
		background: #28c840;
	}

	.tui {
		flex: 1;
		min-height: 0;
		display: flex;
		flex-direction: column;
		padding: 8px;
		gap: 4px;
	}

	.shell {
		display: flex;
		flex-direction: column;
		color: #e9e8e1;
	}

	.dim {
		color: #5f7e97;
	}

	.block {
		display: inline-block;
		width: 7px;
		height: 13px;
		margin-left: 2px;
		vertical-align: -2px;
		background: #e9e8e1;
	}

	.frame {
		flex: 1;
		min-height: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 6px;
		padding: 6px 8px;
		border: 1px solid #5f7e97;
		overflow: hidden;
	}

	.title {
		align-self: stretch;
		padding: 3px 0;
		text-align: center;
		border: 1px solid #7c5cfa;
		border-radius: 4px;
	}

	.field {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.input {
		min-width: 9ch;
	}

	.table {
		display: grid;
		grid-template-columns: 2fr 1.2fr 0.6fr;
		gap: 2px;
		align-self: stretch;
		text-align: center;
	}

	.head {
		padding: 2px 0;
		border: 1px solid #5f7e97;
	}

	.picked {
		padding: 6px 2px;
		background: #6e44e0;
		color: #fff;
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 4px;
		align-self: stretch;
		font-size: 9.5px;
		line-height: 1.2;
		text-align: center;
	}

	.cell {
		display: flex;
		flex-direction: column;
		padding: 3px 0;
		border: 1px solid #ef5350;
		border-radius: 3px;
	}

	.cell.open {
		border-color: #7fd68a;
	}

	.cell.cursor {
		background: #6e44e0;
		border-color: #6e44e0;
		color: #fff;
	}

	.status {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
	}

	.gap {
		margin-top: 10px;
	}

	.ok {
		color: #7fd68a;
	}

	.alarm {
		color: #ffd27a;
	}

	.footer {
		flex: none;
		text-align: center;
		font-size: 10px;
	}

	.sr-only {
		position: absolute;
		width: 1px;
		height: 1px;
		overflow: hidden;
		clip-path: inset(50%);
		white-space: nowrap;
	}

	.play {
		position: absolute;
		left: 50%;
		top: 55%;
		width: 48px;
		height: 48px;
		padding: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 4px;
		border: 0;
		border-radius: 50%;
		background: #82aaff;
		color: #011627;
		box-shadow: 0 4px 14px rgba(0, 0, 0, 0.35);
		cursor: pointer;
		transform: translate(-50%, -50%);
		transition:
			transform 0.15s ease,
			background-color 0.15s ease;
	}

	.play:hover {
		background: #a9c3ff;
		transform: translate(-50%, -50%) scale(1.06);
	}

	.play svg {
		width: 20px;
		height: 20px;
		margin-left: 2px;
		fill: currentColor;
	}

	.play.again {
		left: auto;
		top: auto;
		right: 10px;
		bottom: 10px;
		width: auto;
		height: auto;
		padding: 5px 10px 5px 8px;
		border-radius: 999px;
		font: inherit;
		font-size: 10px;
		transform: none;
	}

	.play.again:hover {
		transform: none;
	}

	.play.again svg {
		width: 11px;
		height: 11px;
		margin: 0;
	}
</style>

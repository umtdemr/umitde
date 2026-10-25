import { fireEvent, render, screen, within } from '@testing-library/svelte';
import { createRawSnippet } from 'svelte';
import { describe, expect, it } from 'vitest';
import MimicRobot from './MimicRobot.svelte';

const info = createRawSnippet(() => ({ render: () => '<p>robot info</p>' }));

function setup() {
	const result = render(MimicRobot, { info });
	const arm = (name: string) =>
		result.container.querySelector(`[data-arm="${name}"]`) as SVGGElement;
	const pressed = () =>
		screen
			.getAllByRole('button')
			.filter((button) => button.getAttribute('aria-pressed') === 'true')
			.map((button) => button.textContent);
	return { ...result, arm, pressed };
}

describe('MimicRobot', () => {
	it('starts at rest', () => {
		const { pressed } = setup();
		expect(pressed()).toEqual(['rest']);
		expect(screen.getByRole('img').getAttribute('aria-label')).toBe(
			'You and the robot, pose: rest'
		);
		expect(screen.getByText('robot info')).toBeTruthy();
	});

	it('keeps the pose buttons inside the stage so the title lines up', () => {
		const { container } = setup();
		const group = screen.getByRole('group', { name: 'Pick a pose' });
		expect(container.querySelector('.toy-stage')?.contains(group)).toBe(true);
		expect(
			within(group)
				.getAllByRole('button')
				.map((b) => b.textContent)
		).toEqual(['rest', 'wave', 'arms up', 't-pose']);
	});

	it('mirrors a wave: the robot raises the opposite arm', async () => {
		const { arm, pressed } = setup();
		await fireEvent.click(screen.getByRole('button', { name: 'wave' }));
		expect(pressed()).toEqual(['wave']);
		expect(screen.getByRole('img').getAttribute('aria-label')).toBe(
			'You and the robot, pose: wave'
		);
		expect(arm('human-right-upper').style.transform).toBe('rotate(-15deg)');
		expect(arm('human-right-fore').style.transform).toBe('translate(26px, 0px) rotate(-60deg)');
		expect(arm('robot-left-upper').style.transform).toBe('rotate(195deg)');
		expect(arm('robot-left-fore').style.transform).toBe('translate(26px, 0px) rotate(60deg)');
		// the other robot arm still mirrors the resting human left arm
		expect(arm('robot-right-upper').style.transform).toBe('rotate(75deg)');
	});

	it('mirrors a t-pose', async () => {
		const { arm } = setup();
		await fireEvent.click(screen.getByRole('button', { name: 't-pose' }));
		expect(arm('robot-left-upper').style.transform).toBe('rotate(180deg)');
		expect(arm('robot-right-upper').style.transform).toBe('rotate(0deg)');
	});

	it('lags the robot 0.3s behind you', () => {
		const { arm } = setup();
		expect(arm('robot-left-upper').style.transitionDelay).toBe('0.3s');
		expect(arm('robot-right-fore').style.transitionDelay).toBe('0.3s');
		expect(arm('human-left-upper').style.transitionDelay).toBe('');
	});
});

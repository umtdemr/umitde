import type { ToyName } from '$lib/toys/types';

type Base = {
	/** anchor id on /works */
	slug: string;
	name: string;
	description: string;
	href?: string;
	/** shown in the home page works list */
	home?: { label: string; line: string };
};

export type Project = Base &
	({ kind: 'toy'; toy: ToyName; wide?: boolean } | { kind: 'also'; stack: string });

// order is the works page order
export const projects: Project[] = [
	{
		slug: 'eskiz',
		name: 'eskiz.io',
		description: 'A collaborative whiteboard that started out as a Go backend side project.',
		href: 'https://eskiz.io',
		home: { label: 'canvas', line: 'a Go backend that became a whiteboard' },
		kind: 'toy',
		toy: 'eskiz',
		wide: true
	},
	{
		slug: 'spor-istanbul-cli',
		name: 'Spor Istanbul CLI',
		description: 'Watches the gym for a free spot and rings when one opens.',
		home: { label: 'go', line: 'watches the gym for a free spot' },
		kind: 'toy',
		toy: 'spor-cli'
	},
	{
		slug: 'person-alarm',
		name: 'Person Alarm',
		description: 'A camera that raises an alarm when someone walks into a risky area.',
		home: { label: 'esp32', line: 'an alarm for risky areas' },
		kind: 'toy',
		toy: 'person-alarm'
	},
	{
		slug: 'mimic-robot',
		name: 'Mimic Robot',
		description:
			'A wooden robot that copies your gestures. Arduino + Kinect, high school, TÜBİTAK.',
		kind: 'toy',
		toy: 'mimic-robot'
	},
	{
		slug: 'smile-mirror',
		name: 'Smile Mirror',
		description: 'A mirror that takes a selfie when you smile. C++ and OpenCV.',
		kind: 'toy',
		toy: 'smile-mirror'
	},
	{
		slug: 'apeiros',
		name: 'Apeiros',
		description: 'A team whiteboard; I worked on the canvas and its performance.',
		kind: 'also',
		stack: 'React · Node.js'
	},
	{
		slug: 'hierapi',
		name: 'Hierapi',
		description: 'Multi-language e-commerce, my first freelance job.',
		kind: 'also',
		stack: 'Vue · Django'
	},
	{
		slug: 'petra-coffee',
		name: 'Petra Coffee',
		description: 'Website for a coffee roaster.',
		kind: 'also',
		stack: 'Shopify'
	},
	{
		slug: 'umitde',
		name: 'umitde.com',
		description: 'This site.',
		href: '/',
		kind: 'also',
		stack: 'SvelteKit'
	}
];

// code block colours from the PostMinimal mockup; the block background comes from --code-bg in prose.css
const fg = '#E9E8E1';
const keyword = '#8FA6FF';
const numberOrType = '#F2B880';
const string = '#9FD49B';
const comment = '#6E6D67';

export const THEME_NAME = 'umitde';

/** @type {import('shiki').ThemeRegistration} */
export const theme = {
	name: THEME_NAME,
	type: 'dark',
	fg,
	bg: '#16161A',
	colors: {
		'editor.foreground': fg,
		'editor.background': '#16161A'
	},
	tokenColors: [
		{ scope: ['keyword', 'storage'], settings: { foreground: keyword } },
		// operators stay plain, except the word-like ones (new, typeof, lua's and/or/not)
		{ scope: ['keyword.operator'], settings: { foreground: fg } },
		{
			scope: ['keyword.operator.new', 'keyword.operator.expression', 'keyword.operator.word'],
			settings: { foreground: keyword }
		},
		{
			scope: [
				'constant.numeric',
				'constant.language',
				'support.type',
				'storage.type.numeric',
				'storage.type.string',
				'storage.type.boolean',
				'storage.type.byte',
				'storage.type.error',
				'entity.name.type'
			],
			settings: { foreground: numberOrType }
		},
		{ scope: ['string', 'punctuation.definition.string'], settings: { foreground: string } },
		{
			scope: ['comment', 'punctuation.definition.comment'],
			settings: { foreground: comment, fontStyle: 'italic' }
		}
	]
};

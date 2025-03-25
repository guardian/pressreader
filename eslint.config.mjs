import guardian from '@guardian/eslint-config';

export default [
	{
		ignores: ["packages/**/dist/", "**/*.js"]
	},
	...guardian.configs.recommended,
	...guardian.configs.jest,
];

const generateProject = (name) => {
	return {
		displayName: name,
		transform: {
			'^.+\\.tsx?$': 'ts-jest',
		},
		testMatch: [`<rootDir>/packages/${name}/**/*.test.ts`],
		setupFilesAfterEnv: [`./packages/${name}/jest.setup.js`],
	};
};

module.exports = {
	verbose: true,
	testEnvironment: 'node',
	projects: ['cdk', 'pressreader'].map(generateProject),
};

import { App } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { PressReader } from './pressreader';

describe('The PressReader stack', () => {
	it('matches the snapshot', () => {
		const app = new App();
		const stack = new PressReader(app, 'PressReader', {
			stack: 'print-production',
			stage: 'TEST',
			editionKey: 'AUS',
			prefixPath: ['data'],
		});
		const template = Template.fromStack(stack);
		expect(template.toJSON()).toMatchSnapshot();
	});
});

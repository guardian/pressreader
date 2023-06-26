import { App, Duration } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { Schedule } from 'aws-cdk-lib/aws-events';
import { PressReader } from './pressreader';

describe('The PressReader stack', () => {
	it('matches the snapshot', () => {
		const app = new App();
		const stack = new PressReader(app, 'PressReader', {
			stack: 'print-production',
			stage: 'TEST',
			lambdaConfigs: [
				{ editionKey: 'AUS', s3PrefixPath: ['data', 'AUS'] },
				{ editionKey: 'US', s3PrefixPath: ['data', 'US'] },
				{
					editionKey: 'AUS',
					s3PrefixPath: [],
					bucketName: 'press-reader-aus-configs',
				},
				{
					editionKey: 'US',
					s3PrefixPath: [],
					bucketName: 'press-reader-us-configs',
				},
			],
			schedule: Schedule.rate(Duration.minutes(15)),
			domainName: 'pressreader.test.dev-gutools.co.uk',
		});
		const template = Template.fromStack(stack);
		expect(template.toJSON()).toMatchSnapshot();
	});
});

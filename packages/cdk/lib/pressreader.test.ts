import { App } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { Schedule } from 'aws-cdk-lib/aws-events';
import { PressReader } from './pressreader';

const schedule = Schedule.cron({ minute: '15' });

describe('The PressReader stack', () => {
	it('matches the snapshot', () => {
		const app = new App();
		const stack = new PressReader(app, 'PressReader', {
			stack: 'print-production',
			stage: 'TEST',
			lambdaConfigs: [
				{ editionKey: 'AUS', s3PrefixPath: ['data', 'AUS'], schedule },
				{ editionKey: 'US', s3PrefixPath: ['data', 'US'], schedule },
				{
					editionKey: 'AUS',
					s3PrefixPath: [],
					bucketName: 'press-reader-aus-configs',
					schedule,
				},
				{
					editionKey: 'US',
					s3PrefixPath: [],
					bucketName: 'press-reader-us-configs',
					schedule,
				},
			],
			domainName: 'pressreader.test.dev-gutools.co.uk',
		});
		const template = Template.fromStack(stack);
		expect(template.toJSON()).toMatchSnapshot();
	});
});

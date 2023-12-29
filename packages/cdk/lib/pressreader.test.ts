import { App } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { Schedule } from 'aws-cdk-lib/aws-events';
import { pressreaderInfraStack } from '../bin/cdk';
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
			],
			domainName: 'pressreader.test.dev-gutools.co.uk',
			enableNotifications: true,
		});
		const template = Template.fromStack(stack);
		expect(template.toJSON()).toMatchSnapshot();
	});
});

describe('The actual INFRA stack', () => {
	it('should have CollectionLookupFailure alarms enabled', () => {
		/**
		 * nb. this isn't an exhaustive test of everything that's required for
		 * the alarms to work, but it should let us know if we accidentally
		 * disable the alarm, given the config at the time of writing. Testing
		 * the stack in more detail would likely be be fragile to changes in CDK
		 * etc., so may not be worth the maintenance overhead.
		 */
		const template = Template.fromStack(pressreaderInfraStack);
		expect(
			template.hasResourceProperties('AWS::CloudWatch::Alarm', {
				MetricName: 'CollectionLookupFailure-INFRA',
			}),
		);
	});
});

import 'source-map-support/register';
import { GuRootExperimental } from '@guardian/cdk/lib/experimental/constructs/root';
import { Duration } from 'aws-cdk-lib';
import { Schedule } from 'aws-cdk-lib/aws-events';
import { PressReader } from '../lib/pressreader';

const app = new GuRootExperimental();

new PressReader(app, 'PressReader-INFRA', {
	env: { region: 'eu-west-1' },
	app: 'pressreader',
	stack: 'print-production',
	stage: 'INFRA',
	lambdaConfigs: [
		{
			editionKey: 'AUS',
			s3PrefixPath: ['data', 'AUS'],
		},
		{
			editionKey: 'US',
			s3PrefixPath: ['data', 'US'],
		},
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
});

new PressReader(app, 'PressReader-CODE', {
	env: { region: 'eu-west-1' },
	app: 'pressreader',
	stack: 'print-production',
	stage: 'CODE',
	lambdaConfigs: [
		{
			editionKey: 'AUS',
			s3PrefixPath: ['data', 'AUS'],
		},
		{
			editionKey: 'US',
			s3PrefixPath: ['data', 'US'],
		},
	],
	schedule: Schedule.rate(Duration.days(1)),
});

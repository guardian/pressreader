import 'source-map-support/register';
import { GuRootExperimental } from '@guardian/cdk/lib/experimental/constructs/root';
import { Schedule } from 'aws-cdk-lib/aws-events';
import { PressReader } from '../lib/pressreader';

const app = new GuRootExperimental();

/**
 * Each of the INFRA lambdas is scheduled to run every 15 minutes, but the schedules
 * are offset by 2 minutes to avoid all lambdas running at the same time, to reduce
 * the likelihood of hitting the CAPI rate limit.
 * The monitoring for each lambda assumes that they're running every 15 minutes, so
 * the 'new' lambdas (which are not yet used in production) are schedules to run
 * every 4 times in one hour per day. This way we should be alerted to any issues,
 * without running them too often.
 */
const infraSchedules = [
	Schedule.cron({ minute: '0,15,30,45' }),
	Schedule.cron({ minute: '2,17,32,47' }),
	Schedule.cron({ minute: '4,19,34,49' }),
	Schedule.cron({ minute: '6,21,36,51' }),
] as const;

new PressReader(app, 'PressReader-INFRA', {
	env: { region: 'eu-west-1' },
	app: 'pressreader',
	stack: 'print-production',
	stage: 'INFRA',
	lambdaConfigs: [
		{
			editionKey: 'AUS',
			s3PrefixPath: ['data', 'AUS'],
			schedule: infraSchedules[0],
		},
		{
			editionKey: 'US',
			s3PrefixPath: ['data', 'US'],
			schedule: infraSchedules[1],
		},
		{
			/**
			 * This is the 'legacy' AUS config, which writes to the bucket currently
			 * used in production. It should be removed after Pressreader start using
			 * the new API key.
			 * */
			editionKey: 'AUS',
			s3PrefixPath: [],
			bucketName: 'press-reader-aus-configs',
			schedule: infraSchedules[2],
		},
		{
			/**
			 * This is the 'legacy' US config, which writes to the bucket currently
			 * used in production. It should be removed after Pressreader start using
			 * the new API key.
			 * */
			editionKey: 'US',
			s3PrefixPath: [],
			bucketName: 'press-reader-us-configs',
			schedule: infraSchedules[3],
		},
	],
	domainName: 'pressreader.gutools.co.uk',
});

const codeSchedules = [
	Schedule.cron({ minute: '0', hour: '10' }),
	Schedule.cron({ minute: '2', hour: '10' }),
	Schedule.cron({ minute: '4', hour: '10' }),
	Schedule.cron({ minute: '6', hour: '10' }),
] as const;

new PressReader(app, 'PressReader-CODE', {
	env: { region: 'eu-west-1' },
	app: 'pressreader',
	stack: 'print-production',
	stage: 'CODE',
	lambdaConfigs: [
		{
			editionKey: 'AUS',
			s3PrefixPath: ['data', 'AUS'],
			schedule: codeSchedules[0],
		},
		{
			editionKey: 'US',
			s3PrefixPath: ['data', 'US'],
			schedule: codeSchedules[1],
		},
		{
			editionKey: 'AUS',
			s3PrefixPath: ['old-data', 'AUS'],
			bucketName: 'gu-pressreader-data-code',
			schedule: codeSchedules[2],
		},
		{
			editionKey: 'US',
			s3PrefixPath: ['old-data', 'US'],
			bucketName: 'gu-pressreader-data-code',
			schedule: codeSchedules[3],
		},
	],
	domainName: 'pressreader.code.dev-gutools.co.uk',
});

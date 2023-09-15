import 'source-map-support/register';
import { GuRootExperimental } from '@guardian/cdk/lib/experimental/constructs/root';
import { Schedule } from 'aws-cdk-lib/aws-events';
import { PressReader } from '../lib/pressreader';

const app = new GuRootExperimental();

/**
 * Each of the INFRA lambdas is scheduled to run every 15 minutes, but the schedules
 * are offset by 2 minutes to avoid all lambdas running at the same time, to reduce
 * the likelihood of hitting the CAPI rate limit.
 */
const infraSchedules = [
	Schedule.cron({ minute: '0,15,30,45' }),
	Schedule.cron({ minute: '2,17,32,47' }),
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
	],
	domainName: 'pressreader.gutools.co.uk',
});

const codeSchedules = [
	Schedule.cron({ minute: '0', hour: '10' }),
	Schedule.cron({ minute: '2', hour: '10' }),
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
	],
	domainName: 'pressreader.code.dev-gutools.co.uk',
});

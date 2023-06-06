import 'source-map-support/register';
import { GuRootExperimental } from '@guardian/cdk/lib/experimental/constructs/root';
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
			s3PrefixPath: ['testing'],
			bucketName: 'press-reader-aus-configs',
		},
		{
			editionKey: 'US',
			s3PrefixPath: ['testing'],
			bucketName: 'press-reader-us-configs',
		},
	],
});

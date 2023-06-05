import 'source-map-support/register';
import { GuRootExperimental } from '@guardian/cdk/lib/experimental/constructs/root';
import { PressReader } from '../lib/pressreader';

const app = new GuRootExperimental();
const ausEditionKey = 'AUS';

new PressReader(app, 'PressReaderAus-INFRA', {
	env: { region: 'eu-west-1' },
	app: 'pressreader',
	stack: 'print-production',
	stage: 'INFRA',
	editionKey: ausEditionKey,
	prefixPath: ['data', ausEditionKey],
});

new PressReader(app, 'PressReaderAusOld-INFRA', {
	env: { region: 'eu-west-1' },
	app: 'pressreader',
	stack: 'print-production',
	stage: 'INFRA',
	editionKey: ausEditionKey,
	bucketName: 'press-reader-aus-configs',
	prefixPath: ['testing'],
});

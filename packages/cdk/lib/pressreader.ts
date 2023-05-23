import type { GuStackProps } from '@guardian/cdk/lib/constructs/core';
import { GuStack } from '@guardian/cdk/lib/constructs/core';
import { GuScheduledLambda } from '@guardian/cdk/lib/patterns/scheduled-lambda';
import type { App } from 'aws-cdk-lib';
import { Duration } from 'aws-cdk-lib';
import { Schedule } from 'aws-cdk-lib/aws-events';
import { Runtime } from 'aws-cdk-lib/aws-lambda';

export class PressReader extends GuStack {
	constructor(scope: App, id: string, props: GuStackProps) {
		super(scope, id, props);
		const pressReaderApp = 'pressreader';
		new GuScheduledLambda(this, `${pressReaderApp}-lambda`, {
			app: pressReaderApp,
			runtime: Runtime.NODEJS_18_X,
			memorySize: 512,
			handler: 'handler.main',
			fileName: `pressreader.zip`,
			monitoringConfiguration: {
				noMonitoring: true,
			},
			rules: [{ schedule: Schedule.cron({ minute: '0', hour: '1' }) }],
			timeout: Duration.seconds(300),
		});
	}
}

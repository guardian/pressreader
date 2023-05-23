import type { GuStackProps } from '@guardian/cdk/lib/constructs/core';
import { GuStack } from '@guardian/cdk/lib/constructs/core';
import { GuS3Bucket } from '@guardian/cdk/lib/constructs/s3';
import { GuScheduledLambda } from '@guardian/cdk/lib/patterns/scheduled-lambda';
import type { App } from 'aws-cdk-lib';
import { Duration } from 'aws-cdk-lib';
import { Schedule } from 'aws-cdk-lib/aws-events';
import { Effect, PolicyStatement } from 'aws-cdk-lib/aws-iam';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import { Secret } from 'aws-cdk-lib/aws-secretsmanager';

export class PressReader extends GuStack {
	constructor(scope: App, id: string, props: GuStackProps) {
		super(scope, id, props);
		const pressReaderApp = 'pressreader';

		const dataBucket = new GuS3Bucket(this, 'PressreaderDataBucket', {
			app: pressReaderApp,
			bucketName: `gu-pressreader-data-${this.stage.toLowerCase()}`,
		});

		const capiSecret = new Secret(this, 'CapiTokenSecret', {
			secretName: `/${this.stage}/${this.stack}/${pressReaderApp}/capiToken`,
			description: 'The CAPI token used to retrieve content',
		});

		const capiSecretGetPolicyStatement = new PolicyStatement({
			effect: Effect.ALLOW,
			actions: ['secretsmanager:GetSecretValue'],
			resources: [capiSecret.secretArn],
		});

		const s3PutPolicyStatement = new PolicyStatement({
			effect: Effect.ALLOW,
			actions: ['s3:PutObject'],
			resources: [`${dataBucket.bucketArn}/*`],
		});

		const scheduledLambda = new GuScheduledLambda(
			this,
			`${pressReaderApp}-lambda`,
			{
				app: pressReaderApp,
				runtime: Runtime.NODEJS_18_X,
				memorySize: 512,
				handler: 'handler.main',
				environment: {
					BUCKET_NAME: dataBucket.bucketName,
				},
				fileName: `pressreader.zip`,
				monitoringConfiguration: {
					noMonitoring: true,
				},
				rules: [{ schedule: Schedule.rate(Duration.hours(1)) }],
				timeout: Duration.seconds(300),
			},
		);

		scheduledLambda.addToRolePolicy(capiSecretGetPolicyStatement);
		scheduledLambda.addToRolePolicy(s3PutPolicyStatement);
	}
}

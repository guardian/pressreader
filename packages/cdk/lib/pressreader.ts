import type { GuStackProps } from '@guardian/cdk/lib/constructs/core';
import { GuStack } from '@guardian/cdk/lib/constructs/core';
import { GuS3Bucket } from '@guardian/cdk/lib/constructs/s3';
import { GuScheduledLambda } from '@guardian/cdk/lib/patterns/scheduled-lambda';
import type { App } from 'aws-cdk-lib';
import { Duration } from 'aws-cdk-lib';
import { AwsIntegration, RestApi } from 'aws-cdk-lib/aws-apigateway';
import { Schedule } from 'aws-cdk-lib/aws-events';
import {
	Effect,
	PolicyStatement,
	Role,
	ServicePrincipal,
} from 'aws-cdk-lib/aws-iam';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import { Secret } from 'aws-cdk-lib/aws-secretsmanager';

export class PressReader extends GuStack {
	constructor(scope: App, id: string, props: GuStackProps) {
		super(scope, id, props);
		const pressReaderApp = 'pressreader';

		// S3 Bucket
		const dataBucket = new GuS3Bucket(this, 'PressreaderDataBucket', {
			app: pressReaderApp,
			bucketName: `gu-pressreader-data-${this.stage.toLowerCase()}`,
		});

		// API Gateway
		const apiGateway = new RestApi(this, 'PressReaderAPI', {
			restApiName: 'Press Reader API',
			description: 'Serves data to Press Reader from an S3 bucket.',
		});

		const executeRole = new Role(this, 'ApiGatewayS3AssumeRole', {
			assumedBy: new ServicePrincipal('apigateway.amazonaws.com'),
			roleName: 'APIGatewayS3IntegrationRole',
		});

		executeRole.addToPolicy(
			new PolicyStatement({
				resources: [`${dataBucket.bucketArn}/data/*`],
				actions: ['s3:GetObject'],
			}),
		);

		const s3Integration = new AwsIntegration({
			service: 's3',
			integrationHttpMethod: 'GET',
			path: `${dataBucket.bucketName}/data/{key}`,
			options: {
				credentialsRole: executeRole,
				integrationResponses: [
					{
						statusCode: '200',
						responseParameters: {
							'method.response.header.Content-Type':
								'integration.response.header.Content-Type',
						},
					},
				],
				requestParameters: {
					'integration.request.path.key': 'method.request.path.key',
				},
			},
		});

		apiGateway.root
			.addResource('data')
			.addResource('{key}')
			.addMethod('GET', s3Integration, {
				methodResponses: [
					{
						statusCode: '200',
						responseParameters: {
							'method.response.header.Content-Length': true,
							'method.response.header.Content-Type': true,
						},
					},
				],
				requestParameters: {
					'method.request.path.key': true,
					'method.request.header.Content-Type': true,
				},
				apiKeyRequired: true,
			});

		// create usage plan
		const usagePlan = apiGateway.addUsagePlan('PressReaderAPIUsagePlan', {
			throttle: {
				// Maximum expected average requests per second
				rateLimit: 10,
				burstLimit: 10,
			},
		});

		// create api key
		const pressReaderClientApiKey = apiGateway.addApiKey(
			'PressReaderClientApiKey',
		);

		// associate api key to plan
		usagePlan.addApiKey(pressReaderClientApiKey);

		// associate stage with plan
		usagePlan.addApiStage({ stage: apiGateway.deploymentStage });

		// Secret
		const capiSecret = new Secret(this, 'CapiTokenSecret', {
			secretName: `/${this.stage}/${this.stack}/${pressReaderApp}/capiToken`,
			description: 'The CAPI token used to retrieve content',
		});

		// Scheduled Lambda
		const capiSecretGetPolicyStatement = new PolicyStatement({
			effect: Effect.ALLOW,
			actions: ['secretsmanager:GetSecretValue'],
			resources: [capiSecret.secretArn],
		});

		const s3PutPolicyStatement = new PolicyStatement({
			effect: Effect.ALLOW,
			actions: ['s3:PutObject'],
			resources: [`${dataBucket.bucketArn}/data/*`],
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
					CAPI_SECRET_LOCATION: capiSecret.secretName,
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

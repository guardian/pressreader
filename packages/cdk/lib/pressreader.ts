import { GuCertificate } from '@guardian/cdk/lib/constructs/acm';
import type { GuStackProps } from '@guardian/cdk/lib/constructs/core';
import { GuStack } from '@guardian/cdk/lib/constructs/core';
import { GuCname } from '@guardian/cdk/lib/constructs/dns/';
import { GuS3Bucket } from '@guardian/cdk/lib/constructs/s3';
import { GuScheduledLambda } from '@guardian/cdk/lib/patterns/scheduled-lambda';
import type { App } from 'aws-cdk-lib';
import { Duration } from 'aws-cdk-lib';
import type { DomainName } from 'aws-cdk-lib/aws-apigateway';
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
import { Topic } from 'aws-cdk-lib/aws-sns';
import { EmailSubscription } from 'aws-cdk-lib/aws-sns-subscriptions';

type EditionKey = 'AUS' | 'US';

export interface PressReaderProps extends GuStackProps {
	bucketName?: string;
	editionKey: EditionKey;
	prefixPath: string[];
}

export class PressReader extends GuStack {
	constructor(scope: App, id: string, props: PressReaderProps) {
		super(scope, id, props);
		const appName = 'pressreader';
		const domainName = 'pressreader.gutools.co.uk';
		const { bucketName, editionKey, prefixPath } = props;

		// S3 Bucket
		const dataBucket =
			bucketName === undefined
				? new GuS3Bucket(this, 'PressreaderDataBucket', {
						app: appName,
						bucketName: `gu-pressreader-data-${editionKey.toLowerCase()}`,
				  })
				: GuS3Bucket.fromBucketName(this, 'dataBucket', bucketName);

		// ACM Certificate
		const certificate = new GuCertificate(this, {
			app: appName,
			domainName: domainName,
		});

		// API Gateway
		const apiGateway = new RestApi(this, 'PressReaderAPI', {
			restApiName: 'Press Reader API',
			description: 'Serves data to Press Reader from an S3 bucket.',
			domainName: {
				domainName,
				certificate,
			},
		});

		const executeRole = new Role(this, 'ApiGatewayS3AssumeRole', {
			assumedBy: new ServicePrincipal('apigateway.amazonaws.com'),
			roleName: 'APIGatewayS3IntegrationRole',
		});

		executeRole.addToPolicy(
			new PolicyStatement({
				resources: [[dataBucket.bucketArn, ...prefixPath, '*'].join('/')],
				actions: ['s3:GetObject'],
			}),
		);

		const s3Integration = new AwsIntegration({
			service: 's3',
			integrationHttpMethod: 'GET',
			path: [dataBucket.bucketName, ...prefixPath, '{key}.json'].join('/'),
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

		// domain name
		const apiDomainName = apiGateway.domainName as DomainName;

		new GuCname(this, 'cname', {
			app: appName,
			domainName: domainName,
			ttl: Duration.days(1),
			resourceRecord: apiDomainName.domainNameAliasDomainName,
		});

		// secrets
		const capiSecret = new Secret(this, 'CapiTokenSecret', {
			secretName: `/${this.stage}/${this.stack}/${appName}/capiToken`,
			description: 'The CAPI token used to retrieve content',
		});

		// alarms
		const alarmSnsTopic = new Topic(this, `${appName}-email-alarm-topic`);
		const alertEmail = `newsroom.resilience+alerts@guardian.co.uk`;
		alarmSnsTopic.addSubscription(new EmailSubscription(alertEmail));

		// monitoring config
		const monitoringConfiguration = {
			alarmName: `${appName}-${this.stage}-ErrorAlarm`,
			alarmDescription: `Triggers if there are errors from ${appName} on ${this.stage}`,
			snsTopicName: alarmSnsTopic.topicName,
			toleratedErrorPercentage: 1,
			// Requires 2 failures in a row based on lambda scheduled to run once an hour
			numberOfMinutesAboveThresholdBeforeAlarm: 120,
		};

		// scheduled lambda
		const capiSecretGetPolicyStatement = new PolicyStatement({
			effect: Effect.ALLOW,
			actions: ['secretsmanager:GetSecretValue'],
			resources: [capiSecret.secretArn],
		});

		const s3PutPolicyStatement = new PolicyStatement({
			effect: Effect.ALLOW,
			actions: ['s3:PutObject'],
			resources: [[dataBucket.bucketArn, ...prefixPath, '*'].join('/')],
		});

		const scheduledLambda = new GuScheduledLambda(this, `${appName}-lambda`, {
			app: appName,
			runtime: Runtime.NODEJS_18_X,
			memorySize: 512,
			handler: 'handler.main',
			environment: {
				BUCKET_NAME: dataBucket.bucketName,
				CAPI_SECRET_LOCATION: capiSecret.secretName,
				EDITION_KEY: editionKey,
				PREFIX_PATH: prefixPath.join('/'),
			},
			fileName: `pressreader.zip`,
			monitoringConfiguration,
			rules: [{ schedule: Schedule.rate(Duration.hours(1)) }],
			timeout: Duration.seconds(300),
		});

		scheduledLambda.addToRolePolicy(capiSecretGetPolicyStatement);
		scheduledLambda.addToRolePolicy(s3PutPolicyStatement);
	}
}

import { GuCertificate } from '@guardian/cdk/lib/constructs/acm';
import { GuAlarm } from '@guardian/cdk/lib/constructs/cloudwatch/alarm';
import type { GuStackProps } from '@guardian/cdk/lib/constructs/core';
import { GuStack } from '@guardian/cdk/lib/constructs/core';
import { GuCname } from '@guardian/cdk/lib/constructs/dns/';
import { GuS3Bucket } from '@guardian/cdk/lib/constructs/s3';
import { GuScheduledLambda } from '@guardian/cdk/lib/patterns/scheduled-lambda';
import type { App } from 'aws-cdk-lib';
import { Duration } from 'aws-cdk-lib';
import type { DomainName } from 'aws-cdk-lib/aws-apigateway';
import { AwsIntegration, RestApi } from 'aws-cdk-lib/aws-apigateway';
import { Metric } from 'aws-cdk-lib/aws-cloudwatch';
import type { Schedule } from 'aws-cdk-lib/aws-events';
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
import type { EditionKey } from 'packages/shared-types';

export interface PressReaderProps extends GuStackProps {
	lambdaConfigs: Array<{
		editionKey: EditionKey;
		s3PrefixPath: string[];
		schedule: Schedule;
	}>;
	domainName: string;
	/**
	 * If false, no notifications will be sent for this stack. Should be `true`
	 * for 'INFRA' stage, but it can be useful to set to `false` for 'CODE' stage
	 * to reduce noise. Does not affect alarms for regular monitoring of success
	 * or failure for the lambda.
	 */
	enableNotifications: boolean;
}

export class PressReader extends GuStack {
	constructor(scope: App, id: string, props: PressReaderProps) {
		super(scope, id, props);
		const appName = 'pressreader';
		const domainName = props.domainName;
		const enableNotifications = props.enableNotifications;

		// S3 Bucket
		const dataBucket = new GuS3Bucket(this, 'PressreaderDataBucket', {
			app: appName,
			bucketName: `gu-pressreader-data-${this.stage.toLowerCase()}`,
		});

		// ACM Certificate
		const certificate = new GuCertificate(this, {
			app: appName,
			domainName,
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
			roleName: `APIGatewayS3IntegrationRole${this.stage}`,
		});

		props.lambdaConfigs.forEach((lambdaConfig) => {
			executeRole.addToPolicy(
				new PolicyStatement({
					resources: [
						[dataBucket.bucketArn, ...lambdaConfig.s3PrefixPath, '*'].join('/'),
					],
					actions: ['s3:GetObject'],
				}),
			);

			const s3Integration = new AwsIntegration({
				service: 's3',
				integrationHttpMethod: 'GET',
				path: [
					dataBucket.bucketName,
					...lambdaConfig.s3PrefixPath,
					'{key}.json',
				].join('/'),
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
				.addResource(lambdaConfig.editionKey)
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

		// metrics
		const collectionLookupFailureMetric = new Metric({
			namespace: 'AWS/Lambda',
			metricName: `CollectionLookupFailure-${this.stage}`,
		});

		// non-critical alarms
		if (enableNotifications) {
			const notificationsSnsTopic = new Topic(
				this,
				`${appName}-${this.stage}-email-notifications-topic`,
			);
			const notificationsEmail = `newsroom.resilience+notifications@guardian.co.uk`;
			notificationsSnsTopic.addSubscription(
				new EmailSubscription(notificationsEmail),
			);
			new GuAlarm(this, 'CollectionLookupFailureAlarm', {
				app: appName,
				metric: collectionLookupFailureMetric,
				threshold: 1,
				evaluationPeriods: 1,
				datapointsToAlarm: 1,
				snsTopicName: notificationsSnsTopic.topicName,
			});
		}

		// alarm for GuScheduledLambda built-in monitoring
		const alarmSnsTopic = new Topic(
			this,
			`${appName}-${this.stage}-email-alarm-topic`,
		);
		const alertEmail = `newsroom.resilience+alerts@guardian.co.uk`;
		alarmSnsTopic.addSubscription(new EmailSubscription(alertEmail));

		props.lambdaConfigs.forEach((config) => {
			const lambdaSuffix = config.editionKey;

			const capiSecret = new Secret(this, `CapiTokenSecret${lambdaSuffix}`, {
				secretName: `/${this.stage}/${this.stack}/${appName}/capiToken${lambdaSuffix}`,
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
				resources: [
					[dataBucket.bucketArn, ...config.s3PrefixPath, '*'].join('/'),
				],
			});

			const scheduledLambda = new GuScheduledLambda(
				this,
				`${appName}-${this.stage}-${lambdaSuffix}`,
				{
					// The riff-raff.yaml auto-generation incorporated
					// by using GuRoot and outputting to
					// cdk/cdk.out/riff-raff.yaml when the synth task is
					// run uses this value to identify what to deploy.
					//
					// This value must match one of the contentDirectories
					// identified in .github/workflows/ci.yml
					app: `${appName}-${lambdaSuffix}`,
					runtime: Runtime.NODEJS_20_X,
					memorySize: 512,
					handler: 'handler.main',
					environment: {
						BUCKET_NAME: dataBucket.bucketName,
						CAPI_SECRET_LOCATION: capiSecret.secretName,
						EDITION_KEY: config.editionKey,
						FAILURE_METRIC_NAME: collectionLookupFailureMetric.metricName,
						PREFIX_PATH: config.s3PrefixPath.join('/'),
					},
					fileName: `pressreader.zip`,
					monitoringConfiguration: {
						snsTopicName: alarmSnsTopic.topicName,
						toleratedErrorPercentage: 1,
						lengthOfEvaluationPeriod: Duration.minutes(15),
						numberOfEvaluationPeriodsAboveThresholdBeforeAlarm: 3,
					},
					rules: [{ schedule: config.schedule }],
					timeout: Duration.seconds(300),
				},
			);

			scheduledLambda.addToRolePolicy(capiSecretGetPolicyStatement);
			scheduledLambda.addToRolePolicy(s3PutPolicyStatement);

			Metric.grantPutMetricData(scheduledLambda);
		});
	}
}

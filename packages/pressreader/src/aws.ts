import {
	CloudWatchClient,
	PutMetricDataCommand,
} from '@aws-sdk/client-cloudwatch';
import { S3Client } from '@aws-sdk/client-s3';
import { SecretsManagerClient } from '@aws-sdk/client-secrets-manager';
import { awsRegion, failureMetricName } from './constants';

/**
 * Is this application running locally, or in AWS?
 * LAMBDA_TASK_ROOT & AWS_EXECUTION_ENV are set when running in AWS
 * See: https://docs.aws.amazon.com/lambda/latest/dg/configuration-envvars.html
 */
export const isRunningLocally =
	!process.env.LAMBDA_TASK_ROOT && !process.env.AWS_EXECUTION_ENV;

// We use localstack to mock AWS services if we are running locally.
const awsOptions = isRunningLocally
	? {
			endpoint: 'http://localhost:4566',
			region: 'eu-west-1',
			forcePathStyle: true,
			credentials: {
				accessKeyId: '',
				secretAccessKey: '',
			},
		}
	: {};

export const s3 = new S3Client(awsOptions);
export const secretsManager = new SecretsManagerClient(awsOptions);

const cloudWatchClient = new CloudWatchClient({ region: awsRegion });

// See https://docs.aws.amazon.com/AmazonCloudWatch/latest/APIReference/API_PutMetricData.html#API_PutMetricData_RequestParameters
// and https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/publishingMetrics.html
// for more information about the parameters in this command.
const collectionLookupFailureCommand = new PutMetricDataCommand({
	MetricData: [
		{
			MetricName: failureMetricName,
			Unit: 'None',
			Value: 1.0,
		},
	],
	Namespace: 'AWS/Lambda',
});

export function sendCollectionMismatchMetric() {
	try {
		cloudWatchClient
			.send(collectionLookupFailureCommand)
			.then((a) =>
				console.log(
					`Collection config mismatch alarm sent: ${
						a.$metadata.httpStatusCode ?? 'status code not returned'
					}`,
				),
			)
			.catch((e: unknown) =>
				console.error('Failed to send collection mismatch metric', e),
			);
	} catch (error) {
		console.error('Failed to send collection mismatch metric', error);
	}
}

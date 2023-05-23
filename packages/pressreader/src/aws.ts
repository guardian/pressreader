import { S3Client } from '@aws-sdk/client-s3';
import { SecretsManagerClient } from '@aws-sdk/client-secrets-manager';

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

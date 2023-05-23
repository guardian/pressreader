import { S3Client } from '@aws-sdk/client-s3';
/**
 * Is this application running locally, or in AWS?
 *
 * Heuristics:
 *  – if require.main is the current module, this file was run directly by node.
 *  – if jest is available globally, we're running in a test.
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

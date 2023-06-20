export const awsRegion = process.env.AWS_REGION ?? 'eu-west-1';
export const bucketName = process.env.BUCKET_NAME ?? 'dev-pressreader';
export const prefixPath = process.env.PREFIX_PATH ?? '';
export const failureMetricArn = process.env.FAILURE_METRIC_NAME ?? '';
export const editionKey = process.env.EDITION_KEY;
export const capiSecretLocation =
	process.env.CAPI_SECRET_LOCATION ??
	'/DEV/print-production/pressreader/capiToken';

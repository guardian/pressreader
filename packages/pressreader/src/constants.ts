export const awsRegion = process.env.AWS_REGION ?? 'eu-west-1';
export const bucketName = process.env.BUCKET_NAME ?? 'dev-pressreader';
export const editionKey = process.env.EDITION_KEY;
export const capiSecretLocation =
	process.env.CAPI_SECRET_LOCATION ??
	'/DEV/print-production/pressreader/capiToken';

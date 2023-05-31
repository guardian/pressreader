import { PutObjectCommand } from '@aws-sdk/client-s3';
import { GetSecretValueCommand } from '@aws-sdk/client-secrets-manager';
import { s3, secretsManager } from './aws';
import { bucketName, capiSecretLocation } from './constants';

export const putDataToS3 = async (
	dataToStore: string,
	date: Date,
	editionId: string,
) => {
	const objectLocation = [
		date.getFullYear(),
		(date.getMonth() + 1).toString().padStart(2, '0'),
		date.getDate().toString().padStart(2, '0'),
		'.json',
	].join('');

	const params = {
		Bucket: bucketName,
		Key: ['data', editionId, objectLocation].join('/'),
		Body: dataToStore,
		ContentType: 'application/json',
	};

	return await s3
		.send(new PutObjectCommand(params))
		.then((_) => objectLocation);
};

export const getCapiToken = async () =>
	(
		await secretsManager.send(
			new GetSecretValueCommand({ SecretId: capiSecretLocation }),
		)
	).SecretString as string;

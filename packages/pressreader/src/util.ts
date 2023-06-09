import { PutObjectCommand } from '@aws-sdk/client-s3';
import { GetSecretValueCommand } from '@aws-sdk/client-secrets-manager';
import { s3, secretsManager } from './aws';
import { bucketName, capiSecretLocation, prefixPath } from './constants';

export const putDataToS3 = async (dataToStore: string, date: Date) => {
	const objectLocation = [
		date.getFullYear(),
		(date.getMonth() + 1).toString().padStart(2, '0'),
		date.getDate().toString().padStart(2, '0'),
		'.json',
	].join('');

	const key =
		prefixPath === '' ? objectLocation : [prefixPath, objectLocation].join('/');

	const params = {
		Bucket: bucketName,
		Key: key,
		Body: dataToStore,
		ContentType: 'application/json',
	};

	return await s3.send(new PutObjectCommand(params)).then(() => key);
};

export const getCapiToken = async () =>
	(
		await secretsManager.send(
			new GetSecretValueCommand({ SecretId: capiSecretLocation }),
		)
	).SecretString as string;

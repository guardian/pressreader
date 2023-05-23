import { s3 } from './aws';
import { bucketName } from './constants';

export const putDataToS3 = async (dataToStore: string, date: Date) => {
	const objectLocation = [
		date.getFullYear(),
		(date.getMonth() + 1).toString().padStart(2, '0'),
		date.getDay().toString().padStart(2, '0'),
		'.json',
	].join('');

	const params = {
		Bucket: bucketName,
		Key: objectLocation,
		Body: dataToStore,
		ContentType: 'application/json',
	};

	return await s3
		.putObject(params)
		.promise()
		.then((_) => objectLocation);
};

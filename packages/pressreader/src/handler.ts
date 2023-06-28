import { isEditionKey } from '../../shared-types';
import { sendCollectionMismatchMetric } from './aws';
import { editionKey } from './constants';
import { editionConfigs } from './editionConfigs';
import { editionProcessor } from './processEdition';
import { getCapiToken, putDataToS3 } from './util';

export const main = async () => {
	console.log('Lambda handler called, processing request');

	const capiToken = await getCapiToken();

	if (!isEditionKey(editionKey)) {
		throw new Error(`Edition key ${editionKey ?? 'undefined'} is not valid`);
	}

	const editionConfig = editionConfigs[editionKey];

	console.log(`Got editionConfig: ${JSON.stringify(editionConfig)}`);

	const processor = editionProcessor({
		edition: editionConfig,
		capiConfig: {
			capiKey: capiToken,
			baseCapiUrl: 'https://content.guardianapis.com',
		},
		collectionMismatchAlarm: sendCollectionMismatchMetric,
	});

	const data = await processor.run();

	const dataToStore = JSON.stringify(data);

	const currentDate = new Date();

	const writtenToLocation = await putDataToS3(dataToStore, currentDate);
	console.log(`Written data to: ${writtenToLocation}`);
};

if (require.main === module) {
	void (async () => await main())();
}

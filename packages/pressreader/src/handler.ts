import { isEditionKey } from 'packages/shared-types';
import { editionKey } from './constants';
import { editionConfigs } from './editionConfigs';
import { editionProcessor } from './processEdition';
import { getCapiToken, putDataToS3 } from './util';

export const main = async () => {
	console.log('Lambda handler called, processing request');

	// TODO: Remove this log when consumed
	const capiToken = await getCapiToken();
	console.log(`Got capiToken (length): ${capiToken.length}`);

	// TODO: Remove this log when consumed
	console.log(`Got editionConfig: ${JSON.stringify(editionConfig)}`);

	const processor = editionProcessor({
		edition: editionConfig,
		capiConfig: {
			capiKey: capiToken,
			baseCapiUrl: 'https://content.guardianapis.com',
		},
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

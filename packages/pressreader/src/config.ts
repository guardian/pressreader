import type { PressReaderEditionConfig } from './types/PressReaderConfigTypes';

export const editionConfig: PressReaderEditionConfig = {
	sections: [
		{
			displayName: 'Headlines',
			maximumArticleCount: 12,
			frontSources: [
				{
					collectionIndexes: [1],
					collectionNames: ['Headlines'],
					sectionContentURL:
						'http://api.nextgen.guardianapps.co.uk/au/lite.json',
				},
			],
			capiSources: [],
		},
	],
};

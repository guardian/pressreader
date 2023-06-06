import type { PressReaderEditionConfig } from '../types/PressReaderTypes';

export const usConfig: PressReaderEditionConfig = {
	sections: [
		{
			displayName: 'Politics',
			maximumArticleCount: 8,
			frontSources: [
				{
					collectionIndexes: [],
					collectionNames: ['Australian politics'],
					sectionContentURL:
						'http://api.nextgen.guardianapps.co.uk/australia-news/lite.json',
				},
			],
			capiSources: [
				'search?tag=australia-news%2Faustralian-politics&order-by=newest',
			],
		},
	],
	bannedTags: [
		'sport/series/talking-horses',
		'science/series/alex-bellos-monday-puzzle',
	],
};

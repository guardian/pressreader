import type { PressReaderEditionConfig } from './types/PressReaderTypes';

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
		{
			displayName: 'News',
			maximumArticleCount: 14,
			frontSources: [
				{
					collectionIndexes: [1],
					collectionNames: ['Australia news'],
					sectionContentURL:
						'http://api.nextgen.guardianapps.co.uk/australia-news/lite.json',
				},
				{
					collectionIndexes: [],
					collectionNames: ['Across the country'],
					sectionContentURL:
						'http://api.nextgen.guardianapps.co.uk/au/lite.json',
				},
			],
			capiSources: [],
		},
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

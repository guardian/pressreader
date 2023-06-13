import type { PressReaderEditionConfig } from '../types/PressReaderTypes';

export const ausConfig: PressReaderEditionConfig = {
	sections: [
		{
			displayName: 'Headlines',
			maximumArticleCount: 12,
			frontSources: [
				{
					collectionIndexes: [0],
					collectionNames: ['Headlines'],
					sectionContentURL:
						'https://api.nextgen.guardianapps.co.uk/au/lite.json',
				},
			],
			capiSources: [],
		},
		{
			displayName: 'News',
			maximumArticleCount: 14,
			frontSources: [
				{
					collectionIndexes: [0],
					collectionNames: ['Australia news'],
					sectionContentURL:
						'https://api.nextgen.guardianapps.co.uk/australia-news/lite.json',
				},
				{
					collectionIndexes: [],
					collectionNames: ['Across the country'],
					sectionContentURL:
						'https://api.nextgen.guardianapps.co.uk/au/lite.json',
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
						'https://api.nextgen.guardianapps.co.uk/australia-news/lite.json',
				},
			],
			capiSources: [
				'search?tag=australia-news%2Faustralian-politics&order-by=newest',
			],
		},
		{
			displayName: 'World News',
			maximumArticleCount: 16,
			frontSources: [
				{
					collectionIndexes: [],
					collectionNames: ['Headlines', 'Around the world'],
					sectionContentURL:
						'https://api.nextgen.guardianapps.co.uk/international/lite.json',
				},
			],
			capiSources: [],
		},
		{
			displayName: 'The Long Read',
			maximumArticleCount: 2,
			frontSources: [],
			capiSources: ['search?tag=news%2Fseries%2Fthe-long-read&order-by=newest'],
		},
		{
			displayName: 'Opinion',
			maximumArticleCount: 14,
			frontSources: [
				{
					collectionIndexes: [],
					collectionNames: ['Columnists', 'Indigenous Australia', 'Opinion'],
					sectionContentURL:
						'https://api.nextgen.guardianapps.co.uk/au/commentisfree/lite.json',
				},
				{
					collectionIndexes: [],
					collectionNames: ['Opinion'],
					sectionContentURL:
						'https://api.nextgen.guardianapps.co.uk/au/lite.json',
				},
				{
					collectionIndexes: [],
					collectionNames: ['World view'],
					sectionContentURL:
						'https://api.nextgen.guardianapps.co.uk/au/commentisfree/lite.json',
				},
			],
			capiSources: [],
		},
		{
			displayName: 'Finance',
			maximumArticleCount: 6,
			frontSources: [
				{
					collectionIndexes: [0, 2, 1, 3, 5],
					collectionNames: [],
					sectionContentURL:
						'https://api.nextgen.guardianapps.co.uk/au/business/lite.json',
				},
			],
			capiSources: [],
		},
		{
			displayName: 'The Guardian View',
			maximumArticleCount: 2,
			frontSources: [],
			capiSources: [
				'search?tag=tone%2Feditorials&production-office=aus&order-by=newest',
				'search?tag=tone%2Feditorials&order-by=newest',
			],
		},
		{
			displayName: 'Environment',
			maximumArticleCount: 8,
			frontSources: [
				{
					collectionIndexes: [],
					collectionNames: [
						'Environment',
						'World news',
						'Opinion',
						'Global view',
						'Investigations and analysis',
					],
					sectionContentURL:
						'https://api.nextgen.guardianapps.co.uk/au/environment/lite.json',
				},
			],
			capiSources: [],
		},
		{
			displayName: 'Science',
			maximumArticleCount: 8,
			frontSources: [
				{
					collectionIndexes: [],
					collectionNames: ['Science', 'News', 'Key issues'],
					sectionContentURL:
						'https://api.nextgen.guardianapps.co.uk/science/lite.json',
				},
			],
			capiSources: [
				'search?tag=science%2Fscience&production-office=aus&order-by=newest',
				'search?tag=science%2Fscience&order-by=newest',
			],
		},
		{
			displayName: 'Technology',
			maximumArticleCount: 8,
			frontSources: [
				{
					collectionIndexes: [],
					collectionNames: [
						'Technology',
						'Australian tech',
						'In depth',
						'Opinion & analysis',
						'Inside Silicon Valley',
						'Spotlight',
					],
					sectionContentURL:
						'https://api.nextgen.guardianapps.co.uk/au/technology/lite.json',
				},
			],
			capiSources: [],
		},
		{
			displayName: 'Sport',
			maximumArticleCount: 14,
			frontSources: [
				{
					collectionIndexes: [],
					collectionNames: ['Sport'],
					sectionContentURL:
						'https://api.nextgen.guardianapps.co.uk/au/lite.json',
				},
				{
					collectionIndexes: [],
					collectionNames: ['Sport', 'Features', 'International sport'],
					sectionContentURL:
						'https://api.nextgen.guardianapps.co.uk/au/sport/lite.json',
				},
			],
			capiSources: [],
		},
	],
	bannedTags: [
		'sport/series/talking-horses',
		'science/series/alex-bellos-monday-puzzle',
	],
};

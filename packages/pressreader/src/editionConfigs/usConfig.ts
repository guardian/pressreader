import type { PressReaderEditionConfig } from '../types/PressReaderTypes';

export const usConfig: PressReaderEditionConfig = {
	sections: [
		{
			displayName: 'Headlines',
			maximumArticleCount: 10,
			frontSources: [
				{
					collectionIndexes: [0],
					collectionNames: ['headlines'],
					sectionContentURL:
						'http://api.nextgen.guardianapps.co.uk/us/lite.json',
				},
			],
			capiSources: [],
		},
		{
			displayName: 'News',
			maximumArticleCount: 12,
			frontSources: [
				{
					collectionIndexes: [],
					collectionNames: ['US news'],
					sectionContentURL:
						'http://api.nextgen.guardianapps.co.uk/us-news/lite.json',
				},
				{
					collectionIndexes: [],
					collectionNames: ['across the country'],
					sectionContentURL:
						'http://api.nextgen.guardianapps.co.uk/us/lite.json',
				},
			],
			capiSources: [],
		},
		{
			displayName: 'Politics',
			maximumArticleCount: 12,
			frontSources: [
				{
					collectionIndexes: [],
					collectionNames: ['headlines'],
					sectionContentURL:
						'http://api.nextgen.guardianapps.co.uk/us-news/us-politics/lite.json',
				},
				{
					collectionIndexes: [],
					collectionNames: ['US politics'],
					sectionContentURL:
						'http://api.nextgen.guardianapps.co.uk/us-news/lite.json',
				},
				{
					collectionIndexes: [],
					collectionNames: [
						'in depth',
						'Trump administration',
						'the resistance',
						'policy',
					],
					sectionContentURL:
						'http://api.nextgen.guardianapps.co.uk/us-news/us-politics/lite.json',
				},
			],
			capiSources: [],
		},
		{
			displayName: 'World News',
			maximumArticleCount: 8,
			frontSources: [
				{
					collectionIndexes: [],
					collectionNames: ['world news'],
					sectionContentURL:
						'http://api.nextgen.guardianapps.co.uk/world/lite.json',
				},
				{
					collectionIndexes: [],
					collectionNames: ['around the world'],
					sectionContentURL:
						'http://api.nextgen.guardianapps.co.uk/us/lite.json',
				},
				{
					collectionIndexes: [],
					collectionNames: ['around the world'],
					sectionContentURL:
						'http://api.nextgen.guardianapps.co.uk/world/lite.json',
				},
			],
			capiSources: [],
		},
		{
			displayName: 'Opinion',
			maximumArticleCount: 12,
			frontSources: [
				{
					collectionIndexes: [],
					collectionNames: ['opinion', 'spotlight'],
					sectionContentURL:
						'http://api.nextgen.guardianapps.co.uk/us/lite.json',
				},
				{
					collectionIndexes: [],
					collectionNames: ['columnists & contributors', 'opinion'],
					sectionContentURL:
						'http://api.nextgen.guardianapps.co.uk/us/commentisfree/lite.json',
				},
				{
					collectionIndexes: [],
					collectionNames: ['opinion & analysis'],
					sectionContentURL:
						'http://api.nextgen.guardianapps.co.uk/us-news/lite.json',
				},
				{
					collectionIndexes: [],
					collectionNames: ['opinion'],
					sectionContentURL:
						'http://api.nextgen.guardianapps.co.uk/us-news/us-politics/lite.json',
				},
				{
					collectionIndexes: [],
					collectionNames: ['opinion & analysis'],
					sectionContentURL:
						'http://api.nextgen.guardianapps.co.uk/world/lite.json',
				},
				{
					collectionIndexes: [],
					collectionNames: ['explore'],
					sectionContentURL:
						'http://api.nextgen.guardianapps.co.uk/us/lite.json',
				},
				{
					collectionIndexes: [],
					collectionNames: ['spotlight', 'you may have missed'],
					sectionContentURL:
						'http://api.nextgen.guardianapps.co.uk/us/commentisfree/lite.json',
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
			displayName: 'Finance',
			maximumArticleCount: 8,
			frontSources: [
				{
					collectionIndexes: [],
					collectionNames: ['US business'],
					sectionContentURL:
						'http://api.nextgen.guardianapps.co.uk/us-news/lite.json',
				},
				{
					collectionIndexes: [],
					collectionNames: ['business ', 'in depth'],
					sectionContentURL:
						'http://api.nextgen.guardianapps.co.uk/us/business/lite.json',
				},
				{
					collectionIndexes: [],
					collectionNames: ['sustainable business', 'featured series '],
					sectionContentURL:
						'http://api.nextgen.guardianapps.co.uk/us/sustainable-business/lite.json',
				},
				{
					collectionIndexes: [],
					collectionNames: ['around the world'],
					sectionContentURL:
						'http://api.nextgen.guardianapps.co.uk/us/business/lite.json',
				},
			],
			capiSources: [],
		},
		{
			displayName: 'The Guardian View',
			maximumArticleCount: 2,
			frontSources: [],
			capiSources: [
				'search?tag=tone%2Feditorials&production-office=uk&order-by=newest',
				'search?tag=tone%2Feditorials&order-by=newest',
			],
		},
		{
			displayName: 'Arts',
			maximumArticleCount: 12,
			frontSources: [
				{
					collectionIndexes: [],
					collectionNames: ['arts', 'talking points', 'people'],
					sectionContentURL:
						'http://api.nextgen.guardianapps.co.uk/us/culture/lite.json',
				},
				{
					collectionIndexes: [],
					collectionNames: ['film', 'talking points', 'news'],
					sectionContentURL:
						'http://api.nextgen.guardianapps.co.uk/us/film/lite.json',
				},
				{
					collectionIndexes: [],
					collectionNames: ['music', 'talking points', 'news'],
					sectionContentURL:
						'http://api.nextgen.guardianapps.co.uk/music/lite.json',
				},
			],
			capiSources: [],
		},
		{
			displayName: 'Fashion',
			maximumArticleCount: 8,
			frontSources: [
				{
					collectionIndexes: [],
					collectionNames: [
						'fashion',
						'talking points',
						'news',
						'you may have missed',
						'the shows',
					],
					sectionContentURL:
						'http://api.nextgen.guardianapps.co.uk/fashion/lite.json',
				},
			],
			capiSources: [],
		},
		{
			displayName: 'Environment',
			maximumArticleCount: 6,
			frontSources: [
				{
					collectionIndexes: [],
					collectionNames: [
						'environment',
						'talking points',
						'featured series',
						'this land is your land',
						'keystone XL pipeline',
						'energy',
					],
					sectionContentURL:
						'http://api.nextgen.guardianapps.co.uk/us/environment/lite.json',
				},
			],
			capiSources: [],
		},
		{
			displayName: 'Science',
			maximumArticleCount: 6,
			frontSources: [
				{
					collectionIndexes: [],
					collectionNames: ['science', 'blog network', 'news', 'key issues'],
					sectionContentURL:
						'http://api.nextgen.guardianapps.co.uk/science/lite.json',
				},
			],
			capiSources: [
				'search?tag=science%2Fscience&production-office=us&order-by=newest',
				'search?tag=science%2Fscience&order-by=newest',
			],
		},
		{
			displayName: 'Technology',
			maximumArticleCount: 8,
			frontSources: [
				{
					collectionIndexes: [],
					collectionNames: ['technology', 'in depth'],
					sectionContentURL:
						'http://api.nextgen.guardianapps.co.uk/us/technology/lite.json',
				},
			],
			capiSources: [],
		},
		{
			displayName: 'Sport',
			maximumArticleCount: 12,
			frontSources: [
				{
					collectionIndexes: [],
					collectionNames: ['US sports'],
					sectionContentURL:
						'http://api.nextgen.guardianapps.co.uk/us-news/lite.json',
				},
				{
					collectionIndexes: [],
					collectionNames: ['across the country', 'sports'],
					sectionContentURL:
						'http://api.nextgen.guardianapps.co.uk/us/sport/lite.json',
				},
				{
					collectionIndexes: [],
					collectionNames: ['sports'],
					sectionContentURL:
						'http://api.nextgen.guardianapps.co.uk/us/lite.json',
				},
				{
					collectionIndexes: [],
					collectionNames: ['around the world'],
					sectionContentURL:
						'http://api.nextgen.guardianapps.co.uk/us/sport/lite.json',
				},
			],
			capiSources: [
				'search?tag=sport%2Fnfl&order-by=newest',
				'search?tag=sport%2Fmlb&order-by=newest',
				'search?tag=sport%2Fnba&order-by=newest',
				'search?tag=sport%2Fnhl&order-by=newest',
			],
		},
		{
			displayName: 'Soccer',
			maximumArticleCount: 12,
			frontSources: [
				{
					collectionIndexes: [],
					collectionNames: ['football'],
					sectionContentURL:
						'http://api.nextgen.guardianapps.co.uk/football/lite.json',
				},
			],
			capiSources: ['search?tag=football%2Fmls&order-by=newest'],
		},
	],
	bannedTags: [
		'sport/series/talking-horses',
		'science/series/alex-bellos-monday-puzzle',
	],
};

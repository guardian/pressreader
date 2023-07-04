import type { PressReaderEditionConfig } from '../types/PressReaderTypes';

export const usConfig: PressReaderEditionConfig = {
	sections: [
		{
			displayName: 'Headlines',
			maximumArticleCount: 10,
			frontSources: [
				{
					sectionContentURL:
						'https://api.nextgen.guardianapps.co.uk/us/lite.json',
					collectionIds: [
						{
							id: 'c5cad9ee-584d-4e85-85cd-bf8ee481b026',
							lookupType: 'id',
							name: 'Headlines',
						},
						{
							lookupType: 'index',
							/**
							 * Aiming to target the first actual collection on the page, below the hidden
							 * 'palette styles' collection. This will often be the same as 'Headlines', but
							 * headlines might be pushed down if there's a special event.
							 * */
							index: 1,
						},
					],
				},
			],
			capiSources: [],
		},
		{
			displayName: 'News',
			maximumArticleCount: 12,
			frontSources: [
				{
					sectionContentURL:
						'https://api.nextgen.guardianapps.co.uk/us/lite.json',
					collectionIds: [
						{
							id: '5a59a4e5-074e-4a2a-8bbe-2743e07ae30f',
							lookupType: 'id',
							name: 'Across the country',
						},
					],
				},
			],
			capiSources: [],
		},
		{
			displayName: 'Politics',
			maximumArticleCount: 12,
			frontSources: [
				{
					sectionContentURL:
						'https://api.nextgen.guardianapps.co.uk/us-news/lite.json',
					collectionIds: [
						{
							id: '436ed09d-614f-4418-8500-d1fa9e20404e',
							lookupType: 'id',
							name: 'US politics',
						},
					],
				},
				{
					sectionContentURL:
						'https://api.nextgen.guardianapps.co.uk/us-news/us-politics/lite.json',
					collectionIds: [
						{
							id: '7e70e9f4-1c60-42e1-85ee-01c8621a0acc',
							lookupType: 'id',
							name: 'In depth',
						},
					],
				},
			],
			capiSources: [],
		},
		{
			displayName: 'World News',
			maximumArticleCount: 8,
			frontSources: [
				{
					sectionContentURL:
						'https://api.nextgen.guardianapps.co.uk/us/lite.json',
					collectionIds: [
						{
							id: '2e2035e0-7da9-4172-b0b4-787f3e2a4549',
							lookupType: 'id',
							name: 'Around the world',
						},
					],
				},
			],
			capiSources: [],
		},
		{
			displayName: 'Opinion',
			maximumArticleCount: 12,
			frontSources: [
				{
					sectionContentURL:
						'https://api.nextgen.guardianapps.co.uk/us/lite.json',
					collectionIds: [
						{
							id: '98df412d-b0e7-4d9a-98c2-062642823e94',
							lookupType: 'id',
							name: 'Opinion',
						},
						{
							id: 'us-alpha/features/feature-stories',
							lookupType: 'id',
							name: 'Spotlight',
						},
					],
				},
				{
					sectionContentURL:
						'https://api.nextgen.guardianapps.co.uk/us/commentisfree/lite.json',
					collectionIds: [
						{
							id: 'us-alpha/contributors/feature-stories',
							lookupType: 'id',
							name: 'Opinion',
						},
					],
				},
				{
					sectionContentURL:
						'https://api.nextgen.guardianapps.co.uk/us-news/us-politics/lite.json',
					collectionIds: [
						{
							id: '21450e4f-a452-4601-a4b3-03ba00b5da1a',
							lookupType: 'id',
							name: 'Opinion',
						},
					],
				},
				{
					sectionContentURL:
						'https://api.nextgen.guardianapps.co.uk/us/lite.json',
					collectionIds: [
						{
							id: '5fd45b04-c512-4a8c-a9b5-cc07a6097049',
							lookupType: 'id',
							name: 'Explore',
						},
					],
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
					sectionContentURL:
						'https://api.nextgen.guardianapps.co.uk/us-news/lite.json',
					collectionIds: [
						{
							id: 'b0e0bc29-41b5-4dd7-8a5e-f5d4129971a7',
							lookupType: 'id',
							name: 'US business',
						},
					],
				},
				{
					sectionContentURL:
						'https://api.nextgen.guardianapps.co.uk/us/business/lite.json',
					collectionIds: [
						{
							id: '2be3f39d-9032-4197-9479-fb6da23599ff',
							lookupType: 'id',
							name: 'Business ',
						},
						{
							id: '6d3daff4-2a4b-46e9-a972-2fe41195db94',
							lookupType: 'id',
							name: 'In depth',
						},
					],
				},
				{
					sectionContentURL:
						'https://api.nextgen.guardianapps.co.uk/us/sustainable-business/lite.json',
					collectionIds: [
						{
							id: '7f3c-ab04-684f-76a2',
							lookupType: 'id',
							name: 'sustainable business',
						},
					],
				},
				{
					sectionContentURL:
						'https://api.nextgen.guardianapps.co.uk/us/business/lite.json',
					collectionIds: [
						{
							id: '723f35eb-2ab4-4fff-941d-7718b2da4fee',
							lookupType: 'id',
							name: 'Around the world',
						},
					],
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
					sectionContentURL:
						'https://api.nextgen.guardianapps.co.uk/us/culture/lite.json',
					collectionIds: [
						{
							id: 'us/culture/regular-stories',
							lookupType: 'id',
							name: 'Arts',
						},
						{
							id: '747c8b96-288a-449a-9e54-be657895d20d',
							lookupType: 'id',
							name: 'Talking points',
						},
						{
							id: '84c18e8f-0bc4-4797-bd3c-57664bd29a53',
							lookupType: 'id',
							name: 'People',
						},
					],
				},
				{
					sectionContentURL:
						'https://api.nextgen.guardianapps.co.uk/us/film/lite.json',
					collectionIds: [
						{ id: '1ce8-6c50-425f-9d32', lookupType: 'id', name: 'Film' },
						{ id: 'b073-c5d7-c8a9-1e32', lookupType: 'id', name: 'News' },
					],
				},
				{
					sectionContentURL:
						'https://api.nextgen.guardianapps.co.uk/music/lite.json',
					collectionIds: [
						{ id: 'ee1e-171a-2d93-c8c4', lookupType: 'id', name: 'Music' },
					],
				},
			],
			capiSources: [],
		},
		{
			displayName: 'Fashion',
			maximumArticleCount: 8,
			frontSources: [
				{
					sectionContentURL:
						'https://api.nextgen.guardianapps.co.uk/fashion/lite.json',
					collectionIds: [
						{ id: 'eb83-f340-cc50-b311', lookupType: 'id', name: 'Fashion' },
						{
							id: '10419891-2ba1-4eb5-bf53-8933e27ffd1f',
							lookupType: 'id',
							name: 'The shows',
						},
					],
				},
			],
			capiSources: [],
		},
		{
			displayName: 'Environment',
			maximumArticleCount: 6,
			frontSources: [
				{
					sectionContentURL:
						'https://api.nextgen.guardianapps.co.uk/us/environment/lite.json',
					collectionIds: [
						{
							id: '2b027145-7523-4032-a954-5b3121216996',
							lookupType: 'id',
							name: 'Environment',
						},
					],
				},
			],
			capiSources: [],
		},
		{
			displayName: 'Science',
			maximumArticleCount: 6,
			frontSources: [
				{
					sectionContentURL:
						'https://api.nextgen.guardianapps.co.uk/science/lite.json',
					collectionIds: [
						{ id: 'e9c7-cf23-23b1-363b', lookupType: 'id', name: 'Science' },
						{
							id: 'e7623e60-63fe-4f52-8295-3692ef272beb',
							lookupType: 'id',
							name: 'News',
						},
						{
							id: '1ccdafee-622a-4dfb-aaca-e3bb995bd5f1',
							lookupType: 'id',
							name: 'Key issues',
						},
					],
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
					sectionContentURL:
						'https://api.nextgen.guardianapps.co.uk/us/technology/lite.json',
					collectionIds: [
						{ id: '6bb3-9f76-43bd-4213', lookupType: 'id', name: 'Technology' },
						{
							id: 'c4f66912-47c4-4d5b-a52e-a1180bf68e5d',
							lookupType: 'id',
							name: 'In depth',
						},
					],
				},
			],
			capiSources: [],
		},
		{
			displayName: 'Sport',
			maximumArticleCount: 12,
			frontSources: [
				{
					sectionContentURL:
						'https://api.nextgen.guardianapps.co.uk/us-news/lite.json',
					collectionIds: [
						{
							id: 'c8132ecb-e937-4032-b69d-908f09c838a0',
							lookupType: 'id',
							name: 'US sports',
						},
					],
				},
				{
					sectionContentURL:
						'https://api.nextgen.guardianapps.co.uk/us/sport/lite.json',
					collectionIds: [
						{
							id: '7f429d4d-0fd8-4bcb-a44c-e90a816847e3',
							lookupType: 'id',
							name: 'Across the country',
						},
						{ id: 'f6dd-d7b1-0e85-4650', lookupType: 'id', name: 'Sports' },
					],
				},
				{
					sectionContentURL:
						'https://api.nextgen.guardianapps.co.uk/us/lite.json',
					collectionIds: [
						{ id: 'f6dd-d7b1-0e85-4650', lookupType: 'id', name: 'Sports' },
					],
				},
				{
					sectionContentURL:
						'https://api.nextgen.guardianapps.co.uk/us/sport/lite.json',
					collectionIds: [
						{
							id: '0e5f4538-b4cf-4c7b-be44-92966eb638dd',
							lookupType: 'id',
							name: 'Around the world',
						},
					],
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
					sectionContentURL:
						'https://api.nextgen.guardianapps.co.uk/football/lite.json',
					collectionIds: [
						{ id: '1a78-862a-834b-b1d3', lookupType: 'id', name: 'Football' },
					],
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

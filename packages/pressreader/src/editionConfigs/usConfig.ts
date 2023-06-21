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
							id: '7c0f56e8-d4c4-408f-ba58-c29508c8cf5e',
							name: 'Palette styles new do not delete',
						},
						{ id: 'c5cad9ee-584d-4e85-85cd-bf8ee481b026', name: 'Headlines' },
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
						{ id: '436ed09d-614f-4418-8500-d1fa9e20404e', name: 'US politics' },
					],
				},
				{
					sectionContentURL:
						'https://api.nextgen.guardianapps.co.uk/us-news/us-politics/lite.json',
					collectionIds: [
						{ id: '7e70e9f4-1c60-42e1-85ee-01c8621a0acc', name: 'In depth' },
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
						{ id: '98df412d-b0e7-4d9a-98c2-062642823e94', name: 'Opinion' },
						{ id: 'us-alpha/features/feature-stories', name: 'Spotlight' },
					],
				},
				{
					sectionContentURL:
						'https://api.nextgen.guardianapps.co.uk/us/commentisfree/lite.json',
					collectionIds: [
						{ id: 'us-alpha/contributors/feature-stories', name: 'Opinion' },
					],
				},
				{
					sectionContentURL:
						'https://api.nextgen.guardianapps.co.uk/us-news/us-politics/lite.json',
					collectionIds: [
						{ id: '21450e4f-a452-4601-a4b3-03ba00b5da1a', name: 'Opinion' },
					],
				},
				{
					sectionContentURL:
						'https://api.nextgen.guardianapps.co.uk/us/lite.json',
					collectionIds: [
						{ id: '5fd45b04-c512-4a8c-a9b5-cc07a6097049', name: 'Explore' },
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
						{ id: 'b0e0bc29-41b5-4dd7-8a5e-f5d4129971a7', name: 'US business' },
					],
				},
				{
					sectionContentURL:
						'https://api.nextgen.guardianapps.co.uk/us/business/lite.json',
					collectionIds: [
						{ id: '2be3f39d-9032-4197-9479-fb6da23599ff', name: 'Business ' },
						{ id: '6d3daff4-2a4b-46e9-a972-2fe41195db94', name: 'In depth' },
					],
				},
				{
					sectionContentURL:
						'https://api.nextgen.guardianapps.co.uk/us/sustainable-business/lite.json',
					collectionIds: [
						{ id: '7f3c-ab04-684f-76a2', name: 'sustainable business' },
					],
				},
				{
					sectionContentURL:
						'https://api.nextgen.guardianapps.co.uk/us/business/lite.json',
					collectionIds: [
						{
							id: '723f35eb-2ab4-4fff-941d-7718b2da4fee',
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
						{ id: 'us/culture/regular-stories', name: 'Arts' },
						{
							id: '747c8b96-288a-449a-9e54-be657895d20d',
							name: 'Talking points',
						},
						{ id: '84c18e8f-0bc4-4797-bd3c-57664bd29a53', name: 'People' },
					],
				},
				{
					sectionContentURL:
						'https://api.nextgen.guardianapps.co.uk/us/film/lite.json',
					collectionIds: [
						{ id: '1ce8-6c50-425f-9d32', name: 'Film' },
						{ id: 'b073-c5d7-c8a9-1e32', name: 'News' },
					],
				},
				{
					sectionContentURL:
						'https://api.nextgen.guardianapps.co.uk/music/lite.json',
					collectionIds: [{ id: 'ee1e-171a-2d93-c8c4', name: 'Music' }],
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
						{ id: 'eb83-f340-cc50-b311', name: 'Fashion' },
						{ id: '10419891-2ba1-4eb5-bf53-8933e27ffd1f', name: 'The shows' },
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
						{ id: '2b027145-7523-4032-a954-5b3121216996', name: 'Environment' },
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
						{ id: 'e9c7-cf23-23b1-363b', name: 'Science' },
						{ id: 'e7623e60-63fe-4f52-8295-3692ef272beb', name: 'News' },
						{ id: '1ccdafee-622a-4dfb-aaca-e3bb995bd5f1', name: 'Key issues' },
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
						{ id: '6bb3-9f76-43bd-4213', name: 'Technology' },
						{ id: 'c4f66912-47c4-4d5b-a52e-a1180bf68e5d', name: 'In depth' },
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
						{ id: 'c8132ecb-e937-4032-b69d-908f09c838a0', name: 'US sports' },
					],
				},
				{
					sectionContentURL:
						'https://api.nextgen.guardianapps.co.uk/us/sport/lite.json',
					collectionIds: [
						{
							id: '7f429d4d-0fd8-4bcb-a44c-e90a816847e3',
							name: 'Across the country',
						},
						{ id: 'f6dd-d7b1-0e85-4650', name: 'Sports' },
					],
				},
				{
					sectionContentURL:
						'https://api.nextgen.guardianapps.co.uk/us/lite.json',
					collectionIds: [{ id: 'f6dd-d7b1-0e85-4650', name: 'Sports' }],
				},
				{
					sectionContentURL:
						'https://api.nextgen.guardianapps.co.uk/us/sport/lite.json',
					collectionIds: [
						{
							id: '0e5f4538-b4cf-4c7b-be44-92966eb638dd',
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
					collectionIds: [{ id: '1a78-862a-834b-b1d3', name: 'Football' }],
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

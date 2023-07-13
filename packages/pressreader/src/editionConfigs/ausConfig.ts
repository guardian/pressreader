import type { PressReaderEditionConfig } from '../types/PressReaderTypes';

export const ausConfig: PressReaderEditionConfig = {
	sections: [
		{
			displayName: 'Headlines',
			maximumArticleCount: 12,
			frontSources: [
				{
					sectionContentURL:
						'https://api.nextgen.guardianapps.co.uk/au/lite.json',
					collectionIds: [
						{ id: 'a22fa7fc-684f-484a-90bf-3f5aa4b711f7', name: 'Headlines' },
					],
				},
			],
			capiSources: [],
		},
		{
			displayName: 'News',
			maximumArticleCount: 14,
			frontSources: [
				{
					sectionContentURL:
						'https://api.nextgen.guardianapps.co.uk/australia-news/lite.json',
					collectionIds: [
						{
							id: 'ee319aab-a40c-4bc5-a40d-fa8f0b8f2b88',
							name: 'Australia news',
						},
					],
				},
				{
					sectionContentURL:
						'https://api.nextgen.guardianapps.co.uk/au/lite.json',
					collectionIds: [
						{
							id: '5d60fb3d-9bb2-439b-81d4-3bd4d625165a',
							name: 'Across the country',
						},
					],
				},
			],
			capiSources: [
				'search?tag=australia-news/indigenous-australians&order-by=newest',
			],
		},
		{
			displayName: 'Politics',
			maximumArticleCount: 8,
			frontSources: [
				{
					sectionContentURL:
						'https://api.nextgen.guardianapps.co.uk/australia-news/lite.json',
					collectionIds: [
						{
							id: '47eb1794-2f5a-490d-a3af-425d88e2d2f2',
							name: 'Australian politics',
						},
					],
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
					sectionContentURL:
						'https://api.nextgen.guardianapps.co.uk/international/lite.json',
					collectionIds: [
						{ id: '10f21d96-18f6-426f-821b-19df55dfb831', name: 'Headlines' },
						{
							id: '2c19b8b3-6503-4a3b-8821-9a04898b5243',
							name: 'Around the world',
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
			displayName: 'Opinion',
			maximumArticleCount: 14,
			frontSources: [
				{
					sectionContentURL:
						'https://api.nextgen.guardianapps.co.uk/au/commentisfree/lite.json',
					collectionIds: [
						{ id: '856d1576-46f0-4cbb-af2a-ec83f0eaa9ff', name: 'Columnists' },
						{
							id: '644f8b13-1b3b-42fd-b4a4-79309849b6f4',
							name: 'Indigenous Australia',
						},
						{ id: 'au/commentisfree/regular-stories', name: 'Opinion' },
					],
				},
				{
					sectionContentURL:
						'https://api.nextgen.guardianapps.co.uk/au/lite.json',
					collectionIds: [
						{ id: 'au-alpha/contributors/feature-stories', name: 'Opinion' },
					],
				},
				{
					sectionContentURL:
						'https://api.nextgen.guardianapps.co.uk/au/commentisfree/lite.json',
					collectionIds: [
						{ id: 'a3194998-0d92-49a5-aaa2-c3b7cd26bafc', name: 'World view' },
					],
				},
			],
			capiSources: [],
		},
		{
			displayName: 'Finance',
			maximumArticleCount: 6,
			frontSources: [
				{
					sectionContentURL:
						'https://api.nextgen.guardianapps.co.uk/au/business/lite.json',
					collectionIds: [
						{ id: 'c7bc8956-7d55-4968-840b-e23e44f0e18b', name: 'News' },
						{ id: '0a1173d4-8904-4221-87e6-3f8b22ebc29e', name: 'In depth' },
						{
							id: 'a7de79b6-5b1b-49d1-8e35-cd3725134c9c',
							name: 'Greg Jericho',
						},
						{
							id: '02dcfceb-accb-42a4-a998-4cb1c935738f',
							name: 'Guardian Labs',
						},
						{ id: 'a6be553e-2a64-4bb0-9678-b81227eae5e1', name: 'World news' },
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
				'search?tag=tone%2Feditorials&production-office=aus&order-by=newest',
				'search?tag=tone%2Feditorials&order-by=newest',
			],
		},
		{
			displayName: 'Environment',
			maximumArticleCount: 8,
			frontSources: [
				{
					sectionContentURL:
						'https://api.nextgen.guardianapps.co.uk/au/environment/lite.json',
					collectionIds: [
						{ id: '586be7cd-1f83-4e71-8ff3-f2610d2d71d9', name: 'Environment' },
						{ id: 'b2aab4ef-ccab-4a24-bade-419e8222d789', name: 'World news' },
						{ id: '99b67485-70ef-4f75-be86-15843a8d0207', name: 'Opinion' },
						{ id: 'bd261fb2-3d6d-465e-92e8-e3bf88b3ee67', name: 'Global view' },
						{
							id: '5561a451-dd53-4114-a957-2c8a18f87132',
							name: 'Investigations and analysis',
						},
					],
				},
			],
			capiSources: [],
		},
		{
			displayName: 'Science',
			maximumArticleCount: 8,
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
				'search?tag=science%2Fscience&production-office=aus&order-by=newest',
				'search?tag=science%2Fscience&order-by=newest',
			],
		},
		{
			displayName: 'Technology',
			maximumArticleCount: 8,
			frontSources: [
				{
					sectionContentURL:
						'https://api.nextgen.guardianapps.co.uk/au/technology/lite.json',
					collectionIds: [
						{ id: '6bb3-9f76-43bd-4213', name: 'Technology' },
						{
							id: '86be3263-a4db-4bb8-aaa9-7c9662094958',
							name: 'Australian tech',
						},
						{ id: 'c4f66912-47c4-4d5b-a52e-a1180bf68e5d', name: 'In depth' },
						{ id: '8185-0956-87b3-126d', name: 'Opinion & analysis' },
						{
							id: 'c6a8df3e-7685-4bca-856d-f5b0c59163d0',
							name: 'Inside Silicon Valley',
						},
						{ id: 'cff4aa48-dd86-433f-bc11-eb15abae55fc', name: 'Spotlight' },
					],
				},
			],
			capiSources: [],
		},
		{
			displayName: 'Sport',
			maximumArticleCount: 14,
			frontSources: [
				{
					sectionContentURL:
						'https://api.nextgen.guardianapps.co.uk/au/lite.json',
					collectionIds: [{ id: 'c45d-318f-896c-3a85', name: 'Sport' }],
				},
				{
					sectionContentURL:
						'https://api.nextgen.guardianapps.co.uk/au/sport/lite.json',
					collectionIds: [
						{ id: '0644cd79-4d8b-4d20-a1ed-13f8b7ed4373', name: 'Sport' },
						{ id: 'f40bb225-86ab-4d85-a98d-bb2ea11fb453', name: 'Features' },
						{
							id: 'a368f61c-8bfb-4d5d-9a88-f76123cd22c9',
							name: 'International sport',
						},
					],
				},
			],
			capiSources: [
				'search?tag=football/a-league&order-by=newest',
				'search?tag=sport/afl&order-by=newest',
				'search?tag=sport/nrl&order-by=newest',
			],
		},
	],
	bannedTags: [
		'sport/series/talking-horses',
		'science/series/alex-bellos-monday-puzzle',
	],
};

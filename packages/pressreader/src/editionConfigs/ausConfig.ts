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
						{
							id: 'a22fa7fc-684f-484a-90bf-3f5aa4b711f7',
							lookupType: 'id',
							name: 'Headlines',
						},
						{
							lookupType: 'index',
							/**
							 * aiming to target the first actual collection on the page, below the hidden
							 * 'palette styles' collection.  This will often be the same as 'Headlines', but
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
			maximumArticleCount: 14,
			frontSources: [
				{
					sectionContentURL:
						'https://api.nextgen.guardianapps.co.uk/australia-news/lite.json',
					collectionIds: [
						{
							id: 'ee319aab-a40c-4bc5-a40d-fa8f0b8f2b88',
							lookupType: 'id',
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
							lookupType: 'id',
							name: 'Across the country',
						},
						{
							id: 'bbeca920-4543-4db5-b315-8a39a5e0642f',
							lookupType: 'id',
							name: 'News extra',
						},
						{
							id: '0409d5d4-b375-4f3b-9ca0-d0b8f7c4ebb0',
							lookupType: 'id',
							name: 'The rural network',
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
							lookupType: 'id',
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
						{
							id: '10f21d96-18f6-426f-821b-19df55dfb831',
							lookupType: 'id',
							name: 'Headlines',
						},
						{
							id: '2c19b8b3-6503-4a3b-8821-9a04898b5243',
							lookupType: 'id',
							name: 'Around the world',
						},
					],
				},
				{
					sectionContentURL:
						'https://api.nextgen.guardianapps.co.uk/au/lite.json',
					collectionIds: [
						{
							id: 'a63f-82a9-8f63-edf1',
							lookupType: 'id',
							name: 'Around the world',
						},
					],
				},
				{
					sectionContentURL:
						'https://api.nextgen.guardianapps.co.uk/world/lite.json?INTCMP=CE_AU',
					collectionIds: [
						{
							id: 'b714d00d-9306-41b3-9dd9-7706a793c5e5',
							lookupType: 'id',
							name: 'US',
						},
						{
							id: '352ef8ac-2301-4c55-a9d9-4925e0d9ad57',
							lookupType: 'id',
							name: 'UK',
						},
						{
							id: 'c914be94-82e2-42bb-964f-c66bf1aecdd2',
							lookupType: 'id',
							name: 'Americas',
						},
						{
							id: 'd133cddf-0dab-41c6-ab80-a2e2a687dae1',
							lookupType: 'id',
							name: 'Europe',
						},
						{
							id: 'bd7c0716-d332-471d-ba94-d36f63db064a',
							lookupType: 'id',
							name: 'Asia Pacific',
						},
						{
							id: 'c717f5dd-a4f7-46f8-8617-e6907afb52ed',
							lookupType: 'id',
							name: 'Middle East',
						},
						{
							id: '59d6cdf5-b1fb-480b-9c6f-fd40bf23c7c0',
							lookupType: 'id',
							name: 'Africa',
						},
						{
							id: 'b0189d79-08a3-4054-bede-bbdbf44eaf91',
							lookupType: 'id',
							name: 'South and Central Asia',
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
			displayName: 'Features',
			maximumArticleCount: 12,
			frontSources: [
				{
					sectionContentURL:
						'https://api.nextgen.guardianapps.co.uk/us/technology/lite.json',
					collectionIds: [
						{
							id: 'cff4aa48-dd86-433f-bc11-eb15abae55fc',
							lookupType: 'id',
							name: 'Spotlight',
						},
						{
							id: 'c6a8df3e-7685-4bca-856d-f5b0c59163d0',
							lookupType: 'id',
							name: 'Inside Silicon Valley',
						},
					],
				},
				{
					sectionContentURL:
						'https://api.nextgen.guardianapps.co.uk/au/lite.json',
					collectionIds: [
						{
							id: '7f0d9448-a9af-40a4-a567-24582060d46a',
							lookupType: 'id',
							name: 'Spotlight',
						},
						{
							id: 'au-alpha/features/feature-stories',
							lookupType: 'id',
							name: 'Explore',
						},
						{
							id: '13636104-51ce-4264-bb6b-556c80227331',
							lookupType: 'id',
							name: 'Lifestyle',
						},
					],
				},
				{
					sectionContentURL:
						'https://api.nextgen.guardianapps.co.uk/au/culture/lite.json',
					collectionIds: [
						{
							id: 'au/culture/feature-stories',
							lookupType: 'id',
							name: 'Features',
						},
					],
				},
			],
			capiSources: [],
			toneFilters: {
				filterType: 'includeOnly',
				list: ['tone/features'],
			},
		},
		{
			displayName: 'Arts',
			maximumArticleCount: 8,
			frontSources: [
				{
					sectionContentURL:
						'https://api.nextgen.guardianapps.co.uk/au/lite.json',
					collectionIds: [
						{
							id: '22262088-4bce-4290-9810-cb50bbead8db',
							lookupType: 'id',
							name: 'Culture',
						},
					],
				},
				{
					sectionContentURL:
						'https://api.nextgen.guardianapps.co.uk/au/culture/lite.json',
					collectionIds: [
						{
							id: 'au/culture/regular-stories',
							lookupType: 'id',
							name: 'Culture',
						},
						{
							id: '8f97cb5c-aaa2-476a-b81f-c9ec58040eef',
							lookupType: 'id',
							name: 'Regulars',
						},
						{
							id: 'fe51eab0-7a39-4091-87bc-c9c3f737904f',
							lookupType: 'id',
							name: 'Australia this month',
						},
						{
							id: 'b375bd53-c074-421d-89c4-8bda68a186b6',
							lookupType: 'id',
							name: 'Australian reviews',
						},
					],
				},
				{
					sectionContentURL:
						'https://api.nextgen.guardianapps.co.uk/au/film/lite.json',
					collectionIds: [
						{
							id: '1ce8-6c50-425f-9d32',
							lookupType: 'id',
							name: 'Film',
						},
						{
							id: 'b073-c5d7-c8a9-1e32',
							lookupType: 'id',
							name: 'News',
						},
						{
							id: '42cd-30fd-cd7d-9505',
							lookupType: 'id',
							name: 'Interviews',
						},
					],
				},
			],
			capiSources: [],
		},
		{
			displayName: 'Opinion',
			maximumArticleCount: 14,
			frontSources: [
				{
					sectionContentURL:
						'https://api.nextgen.guardianapps.co.uk/au/commentisfree/lite.json',
					collectionIds: [
						{
							id: '856d1576-46f0-4cbb-af2a-ec83f0eaa9ff',
							lookupType: 'id',
							name: 'Columnists',
						},
						{
							id: '644f8b13-1b3b-42fd-b4a4-79309849b6f4',
							lookupType: 'id',
							name: 'Indigenous Australia',
						},
						{
							id: 'au/commentisfree/regular-stories',
							lookupType: 'id',
							name: 'Opinion',
						},
					],
				},
				{
					sectionContentURL:
						'https://api.nextgen.guardianapps.co.uk/au/lite.json',
					collectionIds: [
						{
							id: 'au-alpha/contributors/feature-stories',
							lookupType: 'id',
							name: 'Opinion',
						},
					],
				},
				{
					sectionContentURL:
						'https://api.nextgen.guardianapps.co.uk/au/commentisfree/lite.json',
					collectionIds: [
						{
							id: 'a3194998-0d92-49a5-aaa2-c3b7cd26bafc',
							lookupType: 'id',
							name: 'World view',
						},
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
						{
							id: 'c7bc8956-7d55-4968-840b-e23e44f0e18b',
							lookupType: 'id',
							name: 'News',
						},
						{
							id: '0a1173d4-8904-4221-87e6-3f8b22ebc29e',
							lookupType: 'id',
							name: 'In depth',
						},
						{
							id: 'a7de79b6-5b1b-49d1-8e35-cd3725134c9c',
							lookupType: 'id',
							name: 'Greg Jericho',
						},
						{
							id: 'ed33702c-81fb-4078-a29b-b54f6f10eff7',
							lookupType: 'id',
							name: 'Opinion',
						},
						{
							id: '5d37a759-090a-4a4c-bdfd-413c5676919c',
							lookupType: 'id',
							name: 'Global view',
						},
						{
							id: 'a6be553e-2a64-4bb0-9678-b81227eae5e1',
							lookupType: 'id',
							name: 'World news',
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
						{
							id: '586be7cd-1f83-4e71-8ff3-f2610d2d71d9',
							lookupType: 'id',
							name: 'Environment',
						},
						{
							id: 'b2aab4ef-ccab-4a24-bade-419e8222d789',
							lookupType: 'id',
							name: 'World news',
						},
						{
							id: '99b67485-70ef-4f75-be86-15843a8d0207',
							lookupType: 'id',
							name: 'Opinion',
						},
						{
							id: 'bd261fb2-3d6d-465e-92e8-e3bf88b3ee67',
							lookupType: 'id',
							name: 'Global view',
						},
						{
							id: '5561a451-dd53-4114-a957-2c8a18f87132',
							lookupType: 'id',
							name: 'Investigations and analysis',
						},
						{
							id: 'e0bff2c6-76d3-485d-b8cf-bccd561127b2',
							lookupType: 'id',
							name: 'The Green Recovery',
						},
						{
							id: 'bc53918b-c9f6-4153-93df-9c3b1f4375c5',
							lookupType: 'id',
							name: "The frontline: inside Australia's climate emergency",
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
						{
							id: '75fd1561-aad3-4e69-baf8-278f7db65050',
							lookupType: 'id',
							name: 'Coronavirus',
						},
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
						{ id: '6bb3-9f76-43bd-4213', lookupType: 'id', name: 'Technology' },
						{
							id: '86be3263-a4db-4bb8-aaa9-7c9662094958',
							lookupType: 'id',
							name: 'Australian tech',
						},
						{
							id: 'c4f66912-47c4-4d5b-a52e-a1180bf68e5d',
							lookupType: 'id',
							name: 'In depth',
						},
						{
							id: '8185-0956-87b3-126d',
							lookupType: 'id',
							name: 'Opinion & analysis',
						},
						{
							id: 'c6a8df3e-7685-4bca-856d-f5b0c59163d0',
							lookupType: 'id',
							name: 'Inside Silicon Valley',
						},
						{
							id: 'cff4aa48-dd86-433f-bc11-eb15abae55fc',
							lookupType: 'id',
							name: 'Spotlight',
						},
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
					collectionIds: [
						{ id: 'c45d-318f-896c-3a85', lookupType: 'id', name: 'Sport' },
					],
				},
				{
					sectionContentURL:
						'https://api.nextgen.guardianapps.co.uk/au/sport/lite.json',
					collectionIds: [
						{
							id: '0644cd79-4d8b-4d20-a1ed-13f8b7ed4373',
							lookupType: 'id',
							name: 'Sport',
						},
						{
							id: 'f40bb225-86ab-4d85-a98d-bb2ea11fb453',
							lookupType: 'id',
							name: 'Features',
						},
						{
							id: 'a368f61c-8bfb-4d5d-9a88-f76123cd22c9',
							lookupType: 'id',
							name: 'International sport',
						},
						{
							id: 'a32d32a5-ad1e-4e74-bfef-fa98e0360299',
							lookupType: 'id',
							name: 'Women’s World Cup 2023',
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

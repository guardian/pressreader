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
							id: '52a630d9-751f-4db2-810e-f6753a6d8103',
							lookupType: 'id',
							name: 'News',
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
							id: '76484132-39af-4bab-895a-8a91b6278314',
							lookupType: 'id',
							name: 'More US News',
						},
						{
							id: '2d0b7e15-e596-4ca3-8d0d-aa034e6350cf',
							lookupType: 'id',
							name: 'In focus',
						},
					],
				},
				{
					sectionContentURL:
						'https://api.nextgen.guardianapps.co.uk/us-news/lite.json',
					collectionIds: [
						{
							id: 'ec5e3c77-2684-44a0-bfbd-d337edcb2cba',
							lookupType: 'id',
							name: 'US headlines',
						},
					],
				},
				{
					sectionContentURL:
						'https://api.nextgen.guardianapps.co.uk/world/lite.json?INTCMP=CE_US',
					collectionIds: [
						{
							id: 'b714d00d-9306-41b3-9dd9-7706a793c5e5',
							lookupType: 'id',
							name: 'US ',
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
						{
							id: '8a12631c-72dd-4f57-baec-24ef7b2abfca',
							lookupType: 'id',
							name: 'US politics',
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
							id: '74570135-eb65-4662-8d43-e8ffc565a738',
							lookupType: 'id',
							name: 'World news',
						},
					],
				},
				{
					sectionContentURL:
						'https://api.nextgen.guardianapps.co.uk/world/lite.json?INTCMP=CE_US',
					collectionIds: [
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
							id: '352ef8ac-2301-4c55-a9d9-4925e0d9ad57',
							lookupType: 'id',
							name: 'UK',
						},
						{
							id: '59d6cdf5-b1fb-480b-9c6f-fd40bf23c7c0',
							lookupType: 'id',
							name: 'Africa',
						},
						{
							id: 'af3722cd-4724-455c-87f2-7e14d53cedec',
							lookupType: 'id',
							name: 'Australia',
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
			displayName: 'Opinion',
			maximumArticleCount: 12,
			frontSources: [
				{
					sectionContentURL:
						'https://api.nextgen.guardianapps.co.uk/us/lite.json',
					collectionIds: [
						{
							id: '4589bc01-6a20-4b96-a313-47acdc9fc944',
							lookupType: 'id',
							name: 'Opinion',
						},
						{
							id: '6878462b-0c9f-4231-b7e2-17a5784c83f4',
							lookupType: 'id',
							name: 'More opinion',
						},
						{
							id: 'c684dad2-3853-4dc0-aa0e-57753f72fa22',
							lookupType: 'id',
							name: 'Features',
						},
						{
							id: 'e73f0725-3b4b-4eca-83b2-9b1454a1d272',
							lookupType: 'id',
							name: 'More features',
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
							id: 'cca60ba5-cb25-4317-b6c8-7c75774ee276',
							lookupType: 'id',
							name: 'You may have missed',
						},
						{
							id: 'c684dad2-3853-4dc0-aa0e-57753f72fa22',
							lookupType: 'id',
							name: 'Features',
						},
						{
							id: 'e73f0725-3b4b-4eca-83b2-9b1454a1d272',
							lookupType: 'id',
							name: 'More features',
						},
					],
				},
				{
					sectionContentURL:
						'https://api.nextgen.guardianapps.co.uk/us/lite.json',
					collectionIds: [
						{
							id: '4589bc01-6a20-4b96-a313-47acdc9fc944',
							lookupType: 'id',
							name: 'Opinion',
						},
						{
							id: '6878462b-0c9f-4231-b7e2-17a5784c83f4',
							lookupType: 'id',
							name: 'More opinion',
						},
					],
				},
			],
			capiSources: [],
			toneFilters: {
				filterType: 'includeOnly',
				list: ['tone/comment'],
			},
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
						'https://api.nextgen.guardianapps.co.uk/us/lite.json',
					collectionIds: [
						{
							id: 'c684dad2-3853-4dc0-aa0e-57753f72fa22',
							lookupType: 'id',
							name: 'Features',
						},
						{
							id: 'e73f0725-3b4b-4eca-83b2-9b1454a1d272',
							lookupType: 'id',
							name: 'More features',
						},
						{
							id: 'cca60ba5-cb25-4317-b6c8-7c75774ee276',
							lookupType: 'id',
							name: 'You may have missed',
						},
					],
				},
				{
					sectionContentURL:
						'https://api.nextgen.guardianapps.co.uk/us/culture/lite.json',
					collectionIds: [
						{
							name: 'People',
							id: '84c18e8f-0bc4-4797-bd3c-57664bd29a53',
							lookupType: 'id',
						},
					],
				},
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
			],
			capiSources: [],
			toneFilters: {
				filterType: 'includeOnly',
				list: ['tone/features'],
			},
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
			capiSources: ['search?tag=business/us-small-business&order-by=newest'],
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
						'https://api.nextgen.guardianapps.co.uk/us/lite.json',
					collectionIds: [
						{
							id: '10fc72da-b0ed-4509-bf6a-d5e64f7cff02',
							lookupType: 'id',
							name: 'Culture',
						},
						{
							id: '0c3c398f-e49a-4569-a8bd-1ef289fb9319',
							lookupType: 'id',
							name: 'More culture',
						},
					],
				},
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
						{
							id: '42cd-30fd-cd7d-9505',
							lookupType: 'id',
							name: 'Interviews',
						},
						{ id: '1ce8-6c50-425f-9d32', lookupType: 'id', name: 'Film' },
						{ id: 'b073-c5d7-c8a9-1e32', lookupType: 'id', name: 'News' },
						{
							id: 'b6329930-35aa-47a3-b459-be6ccf4246d0',
							lookupType: 'id',
							name: 'Reviews',
						},
						{
							id: '7b2cebd1-b526-418f-b2de-8a79589cd552',
							lookupType: 'id',
							name: 'Opinion',
						},
						{
							id: '5ad3a1c5-454a-4426-8a87-b7e3d7404a0e',
							lookupType: 'id',
							name: 'Regulars',
						},
						{
							id: '824a6701-4edf-42c2-b055-3baa568f0da7',
							lookupType: 'id',
							name: 'You may have missed',
						},
					],
				},
				{
					sectionContentURL:
						'https://api.nextgen.guardianapps.co.uk/music/lite.json',
					collectionIds: [
						{ id: 'ee1e-171a-2d93-c8c4', lookupType: 'id', name: 'Music' },
						{
							id: 'd702-e1db-d31a-7c4b',
							lookupType: 'id',
							name: 'Interviews',
						},
						{
							id: 'bc04115d-fc74-49b7-94a1-33ba884f7589',
							lookupType: 'id',
							name: 'Album Reviews',
						},
						{
							id: '0b92-a525-831e-d847',
							lookupType: 'id',
							name: 'Live Reviews',
						},
						{
							id: '8d7ade0f-8ec5-4445-83dd-f59f2b8cf27f',
							lookupType: 'id',
							name: 'Add to playlist',
						},
						{
							id: 'c22d7f49-5555-48db-baa3-d7e5bb50607a',
							lookupType: 'id',
							name: 'Obituaries',
						},
						{
							id: '71aba425-904e-4513-95c9-e9d07290db66',
							lookupType: 'id',
							name: 'You may have missed',
						},
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
						{
							id: 'fb0fd63a-01da-45a0-8e21-2fe4c803c632',
							lookupType: 'id',
							name: 'Spotlight',
						},
						{
							id: 'c199-7bb5-0891-f7d5',
							lookupType: 'id',
							name: 'Shopping',
						},
						{
							id: 'a3365cf0-1d32-48ae-a43b-c8d243f0e472',
							lookupType: 'id',
							name: 'Sustainable fashion',
						},
						{
							id: '07c828ae-276d-45dd-9ce1-393bd2a8d270',
							lookupType: 'id',
							name: "Men's fashion",
						},
						{
							id: '8bfa064b-9628-4895-8f8c-3c700199c32c',
							lookupType: 'id',
							name: 'Regulars',
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
						'https://api.nextgen.guardianapps.co.uk/us/lite.json',
					collectionIds: [
						{
							id: '54223e8e-fcf4-4a14-b814-ec6726a25a3e',
							lookupType: 'id',
							name: 'Climate crisis & environment',
						},
					],
				},
				{
					sectionContentURL:
						'https://api.nextgen.guardianapps.co.uk/us/environment/lite.json',
					collectionIds: [
						{
							id: '2b027145-7523-4032-a954-5b3121216996',
							lookupType: 'id',
							name: 'Environment',
						},
						{
							id: '15b61b85-df4a-4822-9067-7406536092f1',
							lookupType: 'id',
							name: 'Latest news',
						},
						{
							id: '87834bf2-f6ff-4006-959f-28daacd70dd4',
							lookupType: 'id',
							name: "America's dirty divide",
						},
						{
							id: 'f3638be5-c7b5-4860-bee1-258c873d2425',
							lookupType: 'id',
							name: 'Our unequal earth',
						},
						{
							id: 'fadf5460-0504-48ba-ae45-0a260edec291',
							lookupType: 'id',
							name: 'The age of extinction',
						},
						{
							id: 'bdf7a2d5-6631-495f-b852-f63ef9420ec4',
							lookupType: 'id',
							name: 'Seascape',
						},
						{
							id: '8b5b-99a9-e8c3-ff49',
							lookupType: 'id',
							name: 'Opinion',
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
							id: '75fd1561-aad3-4e69-baf8-278f7db65050',
							lookupType: 'id',
							name: 'Coronavirus',
						},
						{
							id: '29b0-f2f0-0c41-3cee',
							lookupType: 'id',
							name: 'Opinion',
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
						{
							id: '1312e7d1-57b5-49e3-900e-795f03620157',
							lookupType: 'id',
							name: 'News',
						},
						{
							id: 'a014f653-dee0-4d72-84f9-7b5e7df1fc83',
							lookupType: 'id',
							name: 'Privacy',
						},
						{
							id: 'cff4aa48-dd86-433f-bc11-eb15abae55fc',
							lookupType: 'id',
							name: 'Spotlight',
						},
						{
							id: '8185-0956-87b3-126d',
							lookupType: 'id',
							name: 'Opinion & analysis',
						},
						{
							id: '16069bf1-3d0e-4c7a-abb2-b77f9ce7e071',
							lookupType: 'id',
							name: 'Games',
						},
						{
							id: 'c6a8df3e-7685-4bca-856d-f5b0c59163d0',
							lookupType: 'id',
							name: 'Inside Silicon Valley',
						},
						{
							id: 'c66d-aa1a-e12d-fc7a',
							lookupType: 'id',
							name: 'Reviews',
						},
						{
							id: '00e17f51-a01d-4df0-9363-4a383f5922b2',
							lookupType: 'id',
							name: 'Devices',
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
						'https://api.nextgen.guardianapps.co.uk/us/sport/lite.json',
					collectionIds: [
						{
							id: '7f429d4d-0fd8-4bcb-a44c-e90a816847e3',
							lookupType: 'id',
							name: 'Across the country',
						},
						{
							id: 'afd83b7b-647f-47a6-a0c1-a875a7dea2c9',
							lookupType: 'id',
							name: 'Sports',
						},
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
						{
							id: '4a81377e-5432-45f3-96b3-511be220e0b2',
							lookupType: 'id',
							name: 'Football',
						},
					],
				},
			],
			capiSources: ['search?tag=football%2Fmls&order-by=newest'],
		},
	],
	bannedTags: [
		'sport/series/talking-horses',
		'science/series/alex-bellos-monday-puzzle',
		'us-news/series/guardian-us-briefing',
		'tone/newsletter-tone',
	],
};

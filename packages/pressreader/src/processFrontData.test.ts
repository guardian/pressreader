import { processFrontData } from './processEdition';
import type { PressedFrontPage } from './types/PressedFrontTypes';

const dummyContentTemplate = {
	id: 'string',
	headline: 'string',
	trailText: 'string',
	thumbnail: 'string',
	shortUrl: 'string',
	group: 'string',
};

const content1 = {
	...dummyContentTemplate,
	id: '1',
};

const content2 = {
	...dummyContentTemplate,
	id: '2',
};

const content3 = {
	...dummyContentTemplate,
	id: '3',
};

const collection1 = {
	id: 'abc',
	displayName: 'name',
	content: [content1, content2],
};
const collection2 = {
	id: 'def',
	displayName: 'my container',
	content: [content3],
};

const pressedPage: PressedFrontPage = {
	webTitle: 'Title',
	collections: [collection1, collection2],
};

describe('processFrontData', () => {
	it('should get stories from each of the matching collections', () => {
		const frontConfigWithData = {
			collectionIndexes: [0],
			collectionNames: ['my container'],
			sectionContentURL: 'sectionContentURL',
			data: pressedPage,
		};
		expect(processFrontData(frontConfigWithData)).toEqual(['1', '2', '3']);
	});

	it('should match a collection by name even if capitalisation differs', () => {
		const frontConfigWithData = {
			collectionIndexes: [],
			collectionNames: ['My Container'],
			sectionContentURL: 'sectionContentURL',
			data: pressedPage,
		};
		expect(processFrontData(frontConfigWithData)).toEqual(['3']);
	});

	it('should ignore unmatched collections', () => {
		const frontConfigWithData = {
			collectionIndexes: [],
			collectionNames: ['not a match'],
			sectionContentURL: 'sectionContentURL',
			data: pressedPage,
		};
		expect(processFrontData(frontConfigWithData)).toEqual([]);
	});

	it('should deduplicated stories using their id', () => {
		const pressedPageWithDuplicate = {
			...pressedPage,
			collections: [
				...pressedPage.collections,
				{
					id: 'ghi',
					displayName: 'name',
					content: [content3, { ...dummyContentTemplate, id: '4' }],
				},
			],
		};

		const frontConfigWithData = {
			collectionIndexes: [2, 3],
			collectionNames: [],
			sectionContentURL: 'sectionContentURL',
			data: pressedPageWithDuplicate,
		};
		/**
		 * If we didn't deduplicate, we'd expect to see '3' twice in this list.
		 */
		expect(processFrontData(frontConfigWithData)).toEqual(['3', '4']);
	});
});

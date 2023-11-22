import { processFrontData } from './processEdition';
import type { PressedFrontPage } from './types/PressedFrontTypes';
import type { CollectionIdentifiers } from './types/PressReaderTypes';

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

function collectionMismatchAlarm() {
	console.warn('collection mismatch alarm');
}

describe('processFrontData', () => {
	it('should get stories from each of the matching collections', () => {
		const collectionIds: CollectionIdentifiers[] = [
			{
				id: 'abc',
				lookupType: 'id',
				name: 'name',
			},
			{
				id: 'def',
				lookupType: 'id',
				name: 'my container',
			},
		];
		const frontConfigWithData = {
			sectionContentURL: 'sectionContentURL',
			collectionIds,
			data: pressedPage,
		};
		expect(
			processFrontData(frontConfigWithData, collectionMismatchAlarm),
		).toEqual(['1', '2', '3']);
	});

	it('should match a collection by id even if capitalisation differs', () => {
		const collectionIds: CollectionIdentifiers[] = [
			{
				id: 'DEF',
				lookupType: 'id',
				name: 'my container',
			},
		];
		const frontConfigWithData = {
			sectionContentURL: 'sectionContentURL',
			data: pressedPage,
			collectionIds,
		};
		expect(
			processFrontData(frontConfigWithData, collectionMismatchAlarm),
		).toEqual(['3']);
	});

	it('should match a collection by index', () => {
		const collectionIds: CollectionIdentifiers[] = [
			{
				index: 0,
				lookupType: 'index',
			},
		];
		const frontConfigWithData = {
			sectionContentURL: 'sectionContentURL',
			data: pressedPage,
			collectionIds,
		};
		expect(
			processFrontData(frontConfigWithData, collectionMismatchAlarm),
		).toEqual(['1', '2']);
	});

	it('should ignore unmatched collections', () => {
		const collectionIds: CollectionIdentifiers[] = [
			{
				id: 'non-existent-collection-id',
				lookupType: 'id',
				name: 'n/a',
			},
		];
		const frontConfigWithData = {
			sectionContentURL: 'sectionContentURL',
			data: pressedPage,
			collectionIds,
		};
		expect(
			processFrontData(frontConfigWithData, collectionMismatchAlarm),
		).toEqual([]);
	});

	it('should call the alarm function when a collection is not found', () => {
		let alarmHasBeenCalled = false;

		function alarmFunction() {
			alarmHasBeenCalled = true;
		}

		const collectionIds: CollectionIdentifiers[] = [
			{
				id: 'def',
				lookupType: 'id',
				name: 'My Container',
			},
			{
				id: 'non-existent-collection-id',
				lookupType: 'id',
				name: 'n/a',
			},
		];

		const frontConfigWithData = {
			sectionContentURL: 'sectionContentURL',
			data: pressedPage,
			collectionIds,
		};
		processFrontData(frontConfigWithData, alarmFunction);
		expect(alarmHasBeenCalled).toEqual(true);
	});
});

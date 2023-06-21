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

function collectionMismatchAlarm() {
	console.warn('collection mismatch alarm');
}

describe('processFrontData', () => {
	it('should get stories from each of the matching collections', () => {
		const frontConfigWithData = {
			sectionContentURL: 'sectionContentURL',
			collectionIds: [
				{
					id: 'abc',
					name: 'name',
				},
				{
					id: 'def',
					name: 'my container',
				},
			],
			data: pressedPage,
		};
		expect(
			processFrontData(frontConfigWithData, collectionMismatchAlarm),
		).toEqual(['1', '2', '3']);
	});

	it('should match a collection by id even if capitalisation differs', () => {
		const frontConfigWithData = {
			sectionContentURL: 'sectionContentURL',
			data: pressedPage,
			collectionIds: [
				{
					id: 'DEF',
					name: 'my container',
				},
			],
		};
		expect(
			processFrontData(frontConfigWithData, collectionMismatchAlarm),
		).toEqual(['3']);
	});

	it('should ignore unmatched collections', () => {
		const frontConfigWithData = {
			sectionContentURL: 'sectionContentURL',
			data: pressedPage,
			collectionIds: [
				{
					id: 'non-existent-colection-id',
					name: 'n/a',
				},
			],
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

		const frontConfigWithData = {
			sectionContentURL: 'sectionContentURL',
			data: pressedPage,
			collectionIds: [
				{
					id: 'def',
					name: 'My Container',
				},
				{
					id: 'non-existent-colection-id',
					name: 'n/a',
				},
			],
		};
		processFrontData(frontConfigWithData, alarmFunction);
		expect(alarmHasBeenCalled).toEqual(true);
	});
});

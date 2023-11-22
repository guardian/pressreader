import {
	isCapiItemResponse,
	isCapiSearchResponse,
	isPressedFrontPage,
} from './typePredicates';
import type { CapiItemResponse } from './types/CapiTypes';

describe('isCapiItemResponse', () => {
	const validCapiItemResponse: CapiItemResponse = {
		status: 'ok',
		content: {
			id: 'us-news/2023/nov/20/first-thing-richest-1-account-for-more-carbon-emissions-than-poorest-66',
			type: 'article',
			webPublicationDate: '2023-11-20T11:50:12Z',
			fields: { wordcount: '1384' },
			tags: [
				{
					id: 'a',
					type: 'series',
				},
				{
					id: 'b',
					type: 'type',
				},
			],
		},
	};
	it('should return true if the data has all expected fields', () => {
		expect(isCapiItemResponse(validCapiItemResponse)).toBe(true);
	});
	it('should return false if the data does not have {status: "okay"}', () => {
		expect(
			isCapiItemResponse({ ...validCapiItemResponse, status: 'error' }),
		).toBe(false);
	});
	it('should return false if the data is an empty object', () => {
		expect(isCapiItemResponse({})).toBe(false);
	});
	it('should return false if the data is not an object', () => {
		expect(isCapiItemResponse([])).toBe(false);
		expect(isCapiItemResponse(null)).toBe(false);
		expect(isCapiItemResponse(undefined)).toBe(false);
		expect(isCapiItemResponse(0)).toBe(false);
		expect(isCapiItemResponse('')).toBe(false);
	});
	it('should return false if content.id is not a string', () => {
		expect(
			isCapiItemResponse({
				status: 'ok',
				content: { ...validCapiItemResponse.content, id: 0 },
			}),
		).toBe(false);
	});
	it('should return false if content.type is not a string', () => {
		expect(
			isCapiItemResponse({
				status: 'ok',
				content: { ...validCapiItemResponse.content, type: 0 },
			}),
		).toBe(false);
	});
	it('should return false if content.webPublicationDate is not a string', () => {
		expect(
			isCapiItemResponse({
				status: 'ok',
				content: {
					...validCapiItemResponse.content,
					webPublicationDate: 0,
				},
			}),
		).toBe(false);
	});
	it('should return false if content.fields.wordcount is not a string', () => {
		expect(
			isCapiItemResponse({
				status: 'ok',
				content: { ...validCapiItemResponse.content, fields: 0 },
			}),
		).toBe(false);
		expect(
			isCapiItemResponse({
				status: 'ok',
				content: { ...validCapiItemResponse.content, fields: { wordcount: 0 } },
			}),
		).toBe(false);
	});
	it('should return false if content.tags is not an array', () => {
		expect(
			isCapiItemResponse({
				status: 'ok',
				content: { ...validCapiItemResponse.content, tags: 0 },
			}),
		).toBe(false);
	});
});

describe('isCapiSearchResponse', () => {
	it('should return true if the data has {response: {results: []}}', () => {
		expect(isCapiSearchResponse({ response: { results: [] } })).toBe(true);
	});
	it('should return false if the data does not have `response` key', () => {
		expect(isCapiSearchResponse({ results: [] })).toBe(false);
	});
	it('should return false if the data does not have {response: {results: []}}', () => {
		expect(isCapiSearchResponse({ response: '' })).toBe(false);
		expect(isCapiSearchResponse({ response: { results: null } })).toBe(false);
	});
	it('should return false if the data is an empty object', () => {
		expect(isCapiSearchResponse({})).toBe(false);
	});
	it('should return false if the data is not an object', () => {
		expect(isCapiSearchResponse([])).toBe(false);
		expect(isCapiSearchResponse(null)).toBe(false);
		expect(isCapiSearchResponse(undefined)).toBe(false);
		expect(isCapiSearchResponse(0)).toBe(false);
		expect(isCapiSearchResponse('')).toBe(false);
	});
});

describe('isPressedFrontPage', () => {
	it('should return true if the data has `webTitle` property', () => {
		expect(isPressedFrontPage({ webTitle: '' })).toBe(true);
	});
	it('should return false if the data does not have `webTitle` property', () => {
		expect(isPressedFrontPage({ title: '' })).toBe(false);
	});
	it('should return false if the data is an empty object', () => {
		expect(isPressedFrontPage({})).toBe(false);
	});
	it('should return false if the data is not an object', () => {
		expect(isPressedFrontPage([])).toBe(false);
		expect(isPressedFrontPage(null)).toBe(false);
		expect(isPressedFrontPage(undefined)).toBe(false);
		expect(isPressedFrontPage(0)).toBe(false);
		expect(isPressedFrontPage('webTitle')).toBe(false);
	});
});

import {
	isCapiItemResponse,
	isCapiSearchResponse,
	isPressedFrontPage,
} from './typePredicates';

describe('isCapiItemResponse', () => {
	it('should return true if the data has {status: "okay"}', () => {
		expect(isCapiItemResponse({ status: 'ok' })).toBe(true);
	});
	it('should return false if the data does not have {status: "okay"}', () => {
		expect(isCapiItemResponse({ status: 'error' })).toBe(false);
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

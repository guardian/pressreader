import { capiResponseToCapiItem, fetchArticleData } from './processEdition';
import type { CapiItemResponse } from './types/CapiTypes';

jest.spyOn(global, 'fetch');

const setFetchMock = (response: unknown, status: number): void => {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-call -- fetch is mocked
	global.fetch
		// @ts-expect-error -- fetch is mocked
		.mockResolvedValue({
			ok: true,
			json: () => response,
			status,
		});
};

describe('fetchArticleData', () => {
	it('should return "undefined" if CAPI returns a 404', async () => {
		setFetchMock({}, 404);

		const data = await fetchArticleData('abc', {
			baseCapiUrl: 'https://example.com',
			capiKey: 'key',
		});
		return expect(data).toBeUndefined();
	});

	it('should return the article id if CAPI returns a valid article response', async () => {
		const articleData: CapiItemResponse = {
			status: 'ok',
			content: {
				id: 'us-news/2023/nov/20/first-thing-richest-1-account-for-more-carbon-emissions-than-poorest-66',
				type: 'article',
				webPublicationDate: '2023-11-20T11:50:12Z',
				fields: { wordcount: '1384' },
				tags: [
					{
						id: 'us-news/series/guardian-us-briefing',
						type: 'series',
					},
					{
						id: 'type/article',
						type: 'type',
					},
				],
			},
		};
		const resp = { response: articleData };
		setFetchMock(resp, 200);

		const data = await fetchArticleData(articleData.content.id, {
			baseCapiUrl: 'https://example.com',
			capiKey: 'key',
		});
		return expect(data).toStrictEqual(capiResponseToCapiItem(articleData));
	});

	it('should throw an error if returned data is not a valid CAPI response', async () => {
		const resp = { response: {} };
		setFetchMock(resp, 200);

		await expect(
			fetchArticleData('abc', {
				baseCapiUrl: 'https://example.com',
				capiKey: 'key',
			}),
		).rejects.toThrow();
	});
});

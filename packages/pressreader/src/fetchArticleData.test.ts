import axios from 'axios';
import { capiResponseToCapiItem, fetchArticleData } from './processEdition';
import type { CapiItemResponse } from './types/CapiTypes';

jest.mock('axios');

describe('fetchArticleData', () => {
	it('should return "undefined" if CAPI returns a 404', async () => {
		const resp = { data: {}, status: 404 };
		const mockedAxios = axios as jest.Mocked<typeof axios>;

		mockedAxios.get.mockResolvedValue(resp);

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
		const resp = { data: { response: articleData }, status: 200 };
		const mockedAxios = axios as jest.Mocked<typeof axios>;

		mockedAxios.get.mockResolvedValue(resp);

		const data = await fetchArticleData(articleData.content.id, {
			baseCapiUrl: 'https://example.com',
			capiKey: 'key',
		});
		return expect(data).toStrictEqual(capiResponseToCapiItem(articleData));
	});

	it('should throw an error if returned data is not a valid CAPI response', async () => {
		const resp = { data: { response: {} }, status: 200 };
		const mockedAxios = axios as jest.Mocked<typeof axios>;

		mockedAxios.get.mockResolvedValue(resp);

		await expect(
			fetchArticleData('abc', {
				baseCapiUrl: 'https://example.com',
				capiKey: 'key',
			}),
		).rejects.toThrow();
	});
});

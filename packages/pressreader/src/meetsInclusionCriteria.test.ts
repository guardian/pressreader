import type { Tag } from '@guardian/content-api-models/v1/tag';
import { TagType } from '@guardian/content-api-models/v1/tagType';
import { meetsInclusionCriteria } from './processEdition';
import type { CapiItem } from './types/CapiTypes';

const mockNow = '2023-05-22T05:00:47Z';
const lessThan24HoursAgo = '2023-05-21T05:00:49Z';
const moreThan24HoursAgo = '2023-05-21T05:00:46Z';
const minWordCount = 1000;

const dummyTag: Tag = {
	id: '',
	type: TagType.KEYWORD,
	webTitle: '',
	webUrl: '',
	apiUrl: '',
	references: [],
};

const passingArticle: CapiItem = {
	id: '123',
	type: 'article',
	webPublicationDate: lessThan24HoursAgo,
	wordcount: 1100,
	tags: [],
};

beforeEach(() => {
	jest.useFakeTimers();
	jest.setSystemTime(new Date(mockNow));
});

describe('meetsInclusionCriteria', () => {
	it('should return true if the article meets all the criteria', () => {
		const bannedTags: string[] = [];
		expect(
			meetsInclusionCriteria(passingArticle, bannedTags, minWordCount),
		).toBe(true);
	});

	it('should return false if the article was published more than 24 hours ago', () => {
		const article: CapiItem = {
			...passingArticle,
			webPublicationDate: moreThan24HoursAgo,
		};
		const bannedTags: string[] = [];
		expect(meetsInclusionCriteria(article, bannedTags, minWordCount)).toBe(
			false,
		);
	});

	it("should return false if the article's wordcount is smaller than the minimum wordcount", () => {
		const article: CapiItem = { ...passingArticle, wordcount: 900 };
		const bannedTags: string[] = [];
		expect(meetsInclusionCriteria(article, bannedTags, minWordCount)).toBe(
			false,
		);
	});

	it("should return false if the article has tags that are included in the 'bannedTags' list", () => {
		const tag = { ...dummyTag, id: 'aa' };
		const article: CapiItem = { ...passingArticle, tags: [tag] };
		const bannedTags: string[] = ['aa', 'bb', 'cc'];
		expect(meetsInclusionCriteria(article, bannedTags, minWordCount)).toBe(
			false,
		);
	});

	it('should return false if more than one criterion is unmet', () => {
		const tag = { ...dummyTag, id: 'aa' };
		const article: CapiItem = {
			id: '4',
			webPublicationDate: moreThan24HoursAgo,
			wordcount: 10,
			tags: [tag],
			type: 'article',
		};
		const bannedTags: string[] = ['aa'];
		expect(meetsInclusionCriteria(article, bannedTags, minWordCount)).toBe(
			false,
		);
	});
});

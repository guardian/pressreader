import { checkArticlesForSection } from './processEdition';
import type { CapiItem, Tag } from './types/CapiTypes';

const dummyTag: Tag = {
	id: 'tag-name',
	type: 'tone',
};

const defaultArticle: CapiItem = {
	id: '123',
	type: 'article',
	webPublicationDate: new Date().toDateString(),
	wordcount: 1100,
	tags: [],
};

describe('checkArticlesForSection', () => {
	it('should filter out undefined values from the articles list', () => {
		const articles: Array<CapiItem | undefined> = [
			undefined,
			defaultArticle,
			undefined,
		];
		const result = checkArticlesForSection(undefined, articles);
		expect(result).toEqual([defaultArticle]);
	});

	it('should remove articles that have a tone tag matching an `excludeAll` filter', () => {
		const articleToInclude: CapiItem = {
			...defaultArticle,
			tags: [dummyTag],
		};
		const articleWithExcludedToneTag: CapiItem = {
			...defaultArticle,
			tags: [{ ...dummyTag, id: 'excludedToneTag' }],
		};
		const articleWithDifferentExcludedToneTag: CapiItem = {
			...defaultArticle,
			tags: [{ ...dummyTag, id: 'differentExcludedToneTag' }],
		};
		const articles = [
			articleToInclude,
			articleWithExcludedToneTag,
			articleWithDifferentExcludedToneTag,
		];
		const toneFilters = {
			filterType: 'excludeAll' as const,
			list: ['excludedToneTag', 'differentExcludedToneTag'],
		};
		const result = checkArticlesForSection(toneFilters, articles);
		expect(result).toEqual([articleToInclude]);
	});

	it('should only return articles that have a tone tag matching an `includeOnly` filter', () => {
		const articleWithNoTags: CapiItem = {
			...defaultArticle,
			tags: [],
		};
		const articleWithIncludedToneTag: CapiItem = {
			...defaultArticle,
			tags: [{ ...dummyTag, id: 'includedToneTag' }],
		};
		const articleWithDifferentIncludedToneTag: CapiItem = {
			...defaultArticle,
			tags: [{ ...dummyTag, id: 'differentIncludedToneTag' }],
		};
		const articles = [
			articleWithNoTags,
			articleWithIncludedToneTag,
			articleWithDifferentIncludedToneTag,
		];
		const toneFilters = {
			filterType: 'includeOnly' as const,
			list: ['includedToneTag', 'differentIncludedToneTag'],
		};
		const result = checkArticlesForSection(toneFilters, articles);
		expect(result).toEqual([
			articleWithIncludedToneTag,
			articleWithDifferentIncludedToneTag,
		]);
	});

	it('should return all articles if no tone filters are provided', () => {
		const articleWithSomeTags: CapiItem = {
			...defaultArticle,
			tags: [
				{ type: 'tone', id: 'someToneTag' },
				{ type: 'keyword', id: 'someKeywordTag' },
			],
		};
		const articles = [articleWithSomeTags, defaultArticle];
		const result = checkArticlesForSection(undefined, articles);
		expect(result).toEqual(articles);
	});
});

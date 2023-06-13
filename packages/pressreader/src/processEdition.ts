import axios from 'axios';
import {
	isCapiItemResponse,
	isCapiSearchResponse,
	isKnownCapiError,
	isNotUndefined,
	isPressedFrontPage,
} from './typePredicates';
import type { CapiItem } from './types/CapiTypes';
import type { PressedFrontPage } from './types/PressedFrontTypes';
import type {
	FrontSource,
	PressReaderEditionConfig,
	PressReaderEditionOutput,
} from './types/PressReaderTypes';

interface FrontSourceWithData extends FrontSource {
	data: PressedFrontPage;
}

type Props = {
	edition: PressReaderEditionConfig;
	capiConfig: CapiConfig;
};

type CapiConfig = {
	baseCapiUrl: string;
	capiKey: string;
};

export function editionProcessor({ edition, capiConfig }: Props) {
	const MIN_WORDCOUNT = 200;

	return { run };

	async function run() {
		const sectionData = await Promise.all(
			edition.sections.map(async (section) => {
				const frontArticleIds = await getArticleIdsFromFronts(
					section.frontSources,
				);
				const capiArticleIds = await getArticleIdsFromCapi(
					section.capiSources,
					capiConfig,
				);
				/**
				 * We can't guarantee that these ids are unique across the whole edition,
				 * but we might as well remove duplicates within each section as we go,
				 * to reduce calls to `fetchArticleData` below.
				 */
				const uniqueArticleIds = Array.from(
					new Set([...frontArticleIds, ...capiArticleIds]),
				);
				const maybeArticles = await Promise.all(
					uniqueArticleIds.map((id) => fetchArticleData(id, capiConfig)),
				);
				const articleDetails = maybeArticles.filter(isNotUndefined);
				return { ...section, articleDetails };
			}),
		);
		/**
		 * These two lists will be mutated in the loop below.
		 */
		const usedArticleIdsStore: string[] = [];
		const outputAccumulator: PressReaderEditionOutput = [];
		/**
		 * Build up the list of articles for each section, checking that they
		 * meet the criteria for inclusion, and also making sure that we
		 * don't include the same article more than once in the edition.
		 */
		for (const section of sectionData) {
			const articleIdsForSection = section.articleDetails
				.filter((article) => {
					return (
						!usedArticleIdsStore.includes(article.id) &&
						meetsInclusionCriteria(
							article,
							edition.bannedTags ?? [],
							MIN_WORDCOUNT,
						)
					);
				})
				.slice(0, section.maximumArticleCount + 1)
				.map((article) => article.id);
			usedArticleIdsStore.push(...articleIdsForSection);
			outputAccumulator.push({
				section: section.displayName,
				articles: articleIdsForSection,
			});
		}
		return outputAccumulator;
	}
}

function CapiSearchUrlFromQuery(query: string, capiConfig: CapiConfig): string {
	return new URL(
		`${query}&api-key=${capiConfig.capiKey}`,
		capiConfig.baseCapiUrl,
	).toString();
}

function CapiItemUrlFromId(id: string, capiConfig: CapiConfig): string {
	const path = `${id}?show-tags=all&show-fields=wordcount&api-key=${capiConfig.capiKey}`;
	return new URL(path, capiConfig.baseCapiUrl).toString();
}

export function meetsInclusionCriteria(
	article: CapiItem,
	bannedTags: string[],
	minWordCount: number,
): boolean {
	if (article.type != 'article') {
		console.log(`Item excluded [Not Article]: ${article.id}`);
		return false;
	}
	if (article.tags.some((tag) => bannedTags.includes(tag.id))) {
		console.log(`Article excluded [Banned Tags]: ${article.id}`);

		return false;
	}
	const publicationDate = new Date(article.webPublicationDate);
	const now = new Date();
	if (publicationDate.getTime() < now.getTime() - 24 * 60 * 60 * 1000) {
		console.log(`Article excluded [Too Old]: ${article.id}`);

		return false;
	}
	if (article.wordcount <= minWordCount) {
		console.log(`Article excluded [Too Short]: ${article.id}`);
		return false;
	}
	return true;
}

async function fetchArticleData(
	id: string,
	capiConfig: CapiConfig,
): Promise<CapiItem | undefined> {
	const url = CapiItemUrlFromId(id, capiConfig);
	const resp = await axios.get(url);
	if (resp.status != 200) {
		throw new Error('Failed to fetch article data');
	}
	const { response: data } = (await resp.data) as unknown as {
		response: unknown;
	};
	/**
	 * One known error is when the article exists but the API key does not
	 * carry the right permissions to access it. We can't know whether an
	 * article falls into this category beforehand, but this shouldn't
	 * be a treated as a fatal error.
	 */
	if (isKnownCapiError(data)) {
		if (
			data.message ==
			'You are not permitted to access this content via your current user tier.'
		) {
			return undefined;
		}
		throw new Error(
			`CAPI error: ${
				data.message ?? 'no message set in CAPI response'
			}. Requested item: ${id}`,
		);
	}
	if (!isCapiItemResponse(data)) {
		throw new Error(`CAPI response is not valid: ${id}`);
	}
	if (
		data.content == undefined ||
		data.content.webPublicationDate == undefined ||
		data.content.fields?.wordcount == undefined
	) {
		throw new Error('CAPI item is missing required fields');
	}
	try {
		const wordcount = parseInt(
			data.content.fields.wordcount as unknown as string,
		);
		const type = data.content.type as unknown as string;
		const webPublicationDate = data.content
			.webPublicationDate as unknown as string;
		return { ...data.content, webPublicationDate, wordcount, type } as CapiItem;
	} catch (e) {
		throw new Error('CAPI item has invalid wordcount value');
	}
}

async function getArticleIdsFromCapi(
	capiSourceUrls: string[],
	capiConfig: CapiConfig,
): Promise<string[]> {
	const capiData = await Promise.all(
		capiSourceUrls.map((query) => fetchCapiSearchData(query, capiConfig)),
	);
	return capiData.flat();
}

async function fetchCapiSearchData(
	query: string,
	capiConfig: CapiConfig,
): Promise<string[]> {
	const url = CapiSearchUrlFromQuery(query, capiConfig);
	const response = await axios.get(url);
	if (response.status != 200) {
		console.log(`Capi search returned no data: ${query}`);
		return [];
	}
	const data = (await response.data) as unknown;
	if (!isCapiSearchResponse(data)) {
		console.log(`Capi search returned invalid response: ${query})}`);
		return [];
	}
	return data.response.results.map((article) => article.id);
}

async function getArticleIdsFromFronts(
	frontSources: FrontSource[],
): Promise<string[]> {
	const frontData = await Promise.all(frontSources.map(fetchFrontData));
	return frontData.filter(isNotUndefined).flatMap(processFrontData);
}

async function fetchFrontData(
	front: FrontSource,
): Promise<FrontSourceWithData | undefined> {
	const response = await axios.get(front.sectionContentURL);
	if (response.status != 200) {
		console.log(
			`Front source error [${response.status}]: ${front.sectionContentURL}`,
		);
		return undefined;
	}
	const data = (await response.data) as unknown;
	if (!isPressedFrontPage(data)) {
		console.log(
			`Front source returned invalid response: ${front.sectionContentURL}`,
		);
		return undefined;
	}
	if (data.collections.length === 0) {
		console.log(`Front source has no collections: ${front.sectionContentURL}`);
		return undefined;
	}
	return {
		...front,
		data,
	};
}

export function processFrontData(front: FrontSourceWithData): string[] {
	/**
	 * Mapping over both names and indexes requires a lot more looping in the
	 * filtering steps, but it allows us to easily log which names and indexes
	 * we fail to find matches for, without adding extra complexity.
	 * We also know that all of the relevant lists are small, so the performance
	 * impact should be negligible.
	 */
	const collectionsByName = front.collectionNames.map((name) => {
		const targetName = name.trim().toLowerCase();
		const collection = front.data.collections.find(
			(collection) =>
				collection.displayName.trim().toLowerCase() === targetName,
		);
		if (collection === undefined) {
			console.error(
				`No collection found for name ${targetName} for ${front.sectionContentURL}`,
			);
		}
		return collection;
	});
	const collectionsByIndex = front.collectionIndexes.map((index) => {
		const collection = front.data.collections.find((_, i) => i === index);
		if (collection === undefined) {
			console.error(
				`No collection found at index ${index} for ${front.sectionContentURL}`,
			);
		}
		return collection;
	});
	const collections = [...collectionsByName, ...collectionsByIndex].filter(
		isNotUndefined,
	);
	const articles = collections.flatMap((collection) => {
		return collection.content.map((article) => article.id);
	});
	return articles;
}

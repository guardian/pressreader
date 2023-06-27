export interface PressReaderEditionConfig {
	sections: SectionConfig[];
	/**
	 * A list of CAPI tags that is used to filter out articles from the section.
	 * If an article has any of these tags, it will not be displayed.
	 * @example `["sport/series/talking-horses"]`
	 */
	bannedTags?: string[];
}

export interface SectionConfig {
	/**
	 * The name we are giving to this section (doesn't need to correspond to anything in
	 * the pressed front json, but should be unique across all sections)
	 */
	displayName: string;
	maximumArticleCount: number;
	frontSources: FrontSource[];
	/**
	 * URLs for CAPI queries to be used as backfills for this section.
	 * @example `["search?tag=science%2Fscience&production-office=us&order-by=newest"]`
	 */
	capiSources: string[];
}

export interface CollectionIdentifiers {
	/**
	 * The unique id of a collection as it occurs in the pressed front json.
	 * Usually this is a 'UUID'-style string (e.g.
	 * `"ffe273ef-8e3e-43eb-a96a-fa528e0f57d1/"`), but occasionally it will be a
	 * more human readable string (e.g. `"uk-alpha")
	 */
	id: string;
	/**
	 Collection names are used to identify a collection in the pressed front
	 page via its `displayName` property. This is used here for two purposes:

	 1. To provide a more human readable way of identifying a collection.
	 2. We know that a given collection can have its name changed without the id
	    changing, so if there's a mismatch between the expected collection name
	    and the actual collection name then this is a signal that we should
	    review the config to make sure that the id still refers to an
	    appropriate collection.

	 */
	name: string;
}

export interface FrontSource {
	/**
	 * Ids of the collections from the front json that we want to extract articles from.
	 */
	collectionIds: CollectionIdentifiers[];
	/**
	 * Path to the 'lite' json version of a pressed front page.
	 * @example `"http://api.nextgen.guardianapps.co.uk/science/lite.json"`
	 */
	sectionContentURL: string;
}

export type PressReaderEditionOutput = PressReaderSectionOutput[];

interface PressReaderSectionOutput {
	section: string;
	articles: string[];
}

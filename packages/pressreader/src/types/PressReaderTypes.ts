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

export interface FrontSource {
	/**
	 * The index of the collection as it occurs in the pressed front json.
	 * (nb. not all collections are displayed on the web version of the front page,
	 * so indexes should not be inferred from the position of a collection on the web)
	 */
	collectionIndexes: number[];
	/**
	 * Collection names are used to identify a collection in the pressed front page
	 * via its `displayName` property.
	 */
	collectionNames: string[];
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

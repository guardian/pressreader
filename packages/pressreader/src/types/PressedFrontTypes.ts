/**
 * This is a subset of the fields that are stored as a `PressedPage` in the
 * Frontend `facia` app (and created or 'pressed' by the `facia-press` app).
 * @see https://github.com/guardian/frontend/blob/44c3e35d102bbf576faedcf5c6944273c6f7a7f6/facia/app/controllers/front/FapiFrontJsonLite.scala#L9-L27
 */
export interface PressedFrontPage {
	webTitle: string;
	collections: CollectionType[];
}

interface CollectionType {
	id: string;
	displayName: string;
	content: ContentType[];
}

interface ContentType {
	id: string;
	headline: string;
	trailText: string;
	thumbnail: string;
	shortUrl: string;
	group: string;
}

import type { CapiDateTime } from '@guardian/content-api-models/v1/capiDateTime';
import type { Tag } from '@guardian/content-api-models/v1/tag';

export interface CapiSearchResponse {
	response: {
		results: Array<{ id: string; type: 'article' }>;
	};
}

export interface CapiItem {
	id: string;
	type: string;
	webPublicationDate: CapiDateTime;
	tags: Tag[];
	wordcount: number;
}

export interface CapiSearchResponse {
	response: {
		results: Array<{ id: string; type: 'article' }>;
	};
}

export interface CapiItemResponse {
	status: 'ok';
	content: {
		id: string;
		type: string;
		webPublicationDate: string;
		fields: {
			wordcount: string;
		};
		tags: Tag[];
	};
}

export interface CapiItem {
	id: string;
	type: string;
	webPublicationDate: string;
	tags: Tag[];
	wordcount: number;
}

export interface Tag {
	id: string;
	type: string;
}

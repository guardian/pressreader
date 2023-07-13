import type { ItemResponse } from '@guardian/content-api-models/v1/itemResponse';
import type { CapiItemResponse, CapiSearchResponse } from './types/CapiTypes';
import type { PressedFrontPage } from './types/PressedFrontTypes';

export function isCapiSearchResponse(
	data: unknown,
): data is CapiSearchResponse {
	// Check that the candidate is an object
	return (
		data != null &&
		(typeof data === 'object' || typeof data === 'function') &&
		// this is a type predicate and casting is recommended by the docs: https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates
		// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- see comment above
		(data as CapiSearchResponse).response !== undefined &&
		Array.isArray((data as CapiSearchResponse).response.results)
	);
}

export function isPressedFrontPage(data: unknown): data is PressedFrontPage {
	// Check that the candidate is an object
	return (
		data != null &&
		(typeof data === 'object' || typeof data === 'function') &&
		// this is a type predicate and casting is recommended by the docs: https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates
		// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- see comment above
		(data as PressedFrontPage).webTitle !== undefined
	);
}

export function isNotUndefined<T>(value: T | undefined): value is T {
	return value !== undefined;
}

export function isCapiItemResponse(data: unknown): data is CapiItemResponse {
	return (
		data != null &&
		(typeof data === 'object' || typeof data === 'function') &&
		(data as ItemResponse).status == 'ok'
	);
}

export function isKnownCapiError(
	data: unknown,
): data is { status: 'error'; message?: string } {
	return (
		data != null &&
		(typeof data === 'object' || typeof data === 'function') &&
		(data as { status: string }).status == 'error'
	);
}

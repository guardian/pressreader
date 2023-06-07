/**
 * The `EditionKey` type is shared between the `cdk` package and the
 * `pressreader` package because each edition has its own lambda so we need to
 * pass the edition key to each lambda so that it can look up the correct
 * edition config.
 *
 * Sharing the type here gives us some security that the edition
 * data will exist in the lambdas's `editionConfigs` object. Adding a new
 * edition to the `editionConfigs` object will require a change to this type,
 * e.g. to add an `EU` edition, update as follows: `const EDITION_KEYS = ['AUS', 'US', 'EU']`.
 */
const EDITION_KEYS = ['AUS', 'US'] as const;

export type EditionKey = (typeof EDITION_KEYS)[number];

export function isEditionKey(key: string | undefined): key is EditionKey {
	// @ts-expect-error This is a type predicate so we should allow that key might not be a valid EditionKey
	return !!key && EDITION_KEYS.includes(key);
}

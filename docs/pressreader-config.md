# Which content is published?

The service reads [config files](https://github.com/guardian/pressreader/tree/main/packages/pressreader/src/editionConfigs) to locate content.

## Sections

```js
export const ausConfig: PressReaderEditionConfig = {
	sections: [
        { '...': '...'},
        { '...': '...'},
        { '...': '...'},
    ]
}
```

Top level array called “sections” contains the definitions necessary to create the index file that Pressreader consults.

Each section contains four keys:

```js
{
    displayName: 'Headlines',
	maximumArticleCount: 12,
	frontSources: [{'...':'...'}],
    capiSources: [],
}
```

- `displayName`: the name of the section as seen by the reader
- `maximumArticleCount`: the maximum number of articles we should include in the section
- `frontSources`: the necessary details to address fronts containers to look for content, you can have multiple fronts sources.
- `capiSources`: the CAPI queries to use to look for content. You can have multiple CAPI sources.

## Fronts sources

Each ‘fronts’ source has three keys.

```js
{
    collectionIndexes: [0],
    collectionNames: ['Headlines'],
    sectionContentURL: 'http://api.nextgen.guardianapps.co.uk/au/lite.json',
}
```

- `sectionContentURL`: the URL of the API to consult for the collections information
- `collectionIndexes`: A list of integers describing which container to fetch data from
- `collectionNames`: A list of strings with the names of which containers to fetch data from

## Capi Sources

This is an array of strings each of which defines a CAPI search to use to locate content for the section.

```js
{
    ...: '...',
    capiSources: [
        'search?tag=tone%2Feditorials&production-office=aus&order-by=newest',
        'search?tag=tone%2Feditorials&order-by=newest',
    ],
}
```

## Article selection logic

Each section is processed in the order it is defined in the config file. Each section’s lists of articles is created by:

1. Consulting any fronts containers referenced by index
1. Consulting any fronts containers referenced by name
1. Consulting CAPI queries in the order they are supplied in the configuration

Articles are also excluded if:

1. They were published more than 24 hours ago
1. They have a word count that's shorter than the `MIN_WORDCOUNT` that's set globally
2. If an article has already been included in a section
3. If the content type is not an article
   
Once the maximum article count has been met, or the sources exhausted we move on to the next section.

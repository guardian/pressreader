# PressReader Lambda

This package contains the code for generating and uploading the edition data that PressReader uses to generate its products.

The code in this package is executed in a scheduled lambda, and the entrypoint
is `src/handler.ts`.

In brief, the lambda takes in config for a particular 'edition' of the Guardian that's generated for PressReader. This config specifies a set sections and associates them with sources (either web fronts or CAPI queries). The lambda fetches article ids from these sources and checks them for eligibility. It then outputs a list of sections, consisting of a section name and a list of article ids, which is consumed by PressReader to create their edition.

The configuration files that we use to generate the edition data are also stored in this repo, in `editionConfigs/`. Some additional documentation of the edition configs can be found inline in the `PressReaderEditionConfig` type.

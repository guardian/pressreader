# Pressreader

This repository contains the a scheduled lambda which 
publishes hourly lists of content to S3 for consumption by the
3rd party company [pressreader](https://about.pressreader.com/cruises-ferries/).

The content in S3 is used to print daily versions of the newspaper where 
internet connectivity may be limited.

Further documentation is available in the [`/docs` folder](./docs/).

## Developing

- `./scripts/setup` to get the project bootstrapped
- `docker-compose up` to start [localstack](https://localstack.cloud/)
- `npm run dev -w pressreader`

_This is a project by the Newsroom Resilience team_
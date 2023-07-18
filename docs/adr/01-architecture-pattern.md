# Architectural Pattern and Backend Language

## Context

This service is replacing an on-premise service that runs in a cron job, taking data about fronts and from the content API to produce json output in S3
which is consumed by [pressreader](https://about.pressreader.com/cruises-ferries/)

## Options

### EC2 Autoscaling Group

This can provide an EC2 instance where we would run a scheduled task. There is infrastructure to maintain -- eg. the instance AMI, OS upgrades etc. -- but the Guardian has robust tooling to manage this. GuCDK also has patterns which make deployment very straightforward. However, we will have to pay for an always-on server, and this service only needs to run for a few minutes every hour.

### Scheduled Lambda

This should cost very little, the cost is for the execution time of the lambda which should only be for a few minutes at most every hour.

#### Scala

We shouldn't use Scala (or other JVM languages) on Lambda, especially when they're in the critical path for a user to see a response, and when they're infrequently accessed. JVM takes a long time to boot on Lambda, which will leave users waiting for a response, and be much more expensive for no gain.

#### JavaScript/Typescript

JS/TS sees ever-increasing adoption at the Guardian for server-side apps. More developers are familiar and comfortable with JS than Scala. The most common framework, Express, is much more lightweight than Play, and so requires more configuration, and (anecdotally) the JS ecosystem sees more churn.

## Decision

We will use Typescript running as a scheduled lambda.

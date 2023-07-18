# Use of API Gateway to serve data

## Context

[Pressreader](https://about.pressreader.com/cruises-ferries/) need to consume the data produced by this service, which is uploaded via a scheduled lambda into S3 with a predicatable name in the for `YYYYMMDD`.

Although the data produced does not contain any information we wish to keep private, we should avoid related incidental security risks and attacks that may increase costs.

It is unlikely to be time/cost effective for the consumer to perform complex authentication.

## Options

### Serve data from a public S3 bucket

This would work as a method for serving content. However when attempting to create public buckets AWS warns "We highly recommend that you never grant any kind of public access to your S3 bucket", and there are [many good reasons](https://serverfault.com/questions/888487/why-does-aws-recommend-against-public-s3-buckets) to avoid this.

These include potential attacks that result in increased costs from uncontrolled downloads of objects, and the potential for unintended content to be made available.

### EC2 Autoscaling Group / ALB

We could serve this content from an EC2 instance, but this would add infrastructure for us to maintain, as well as a monthly fixed cost for the instance & ALB.

### CloudFront distribution / Private S3 bucket

It is possible to create a CloudFront distribution that would point at a private S3 bucket, not requiring the maintenance of an EC2 instance. However CloudFront is not well user at the Guardian, and there are limited options for authentication and rate-limiting.

### API Gateway with an S3 integration

API Gateway can be configured to serve content from a private S3 bucket, with no lambda or other compute infrastructure needed. This method also offers rate-limiting to avoid potential high transfer costs and simple client identification via api keys in a `x-api-key` header. We may also define specific paths and file patterns that can be accessible.

AWS [does not recommend that API Gateway API keys](https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-api-usage-plans.html#apigateway-usage-plans-best-practices) are used for authentication or authorization. However in this case our main concern is attacks that involve high costs from excessive downloads.

### API Gateway to a Lambda proxying content from S3

As with the previous option we have rate-limiting and API keys, but we also would need to maintain application code.

## Decision

We will implement API Gateway with S3 integration as it offers the most benefits (simple auth, rate limit), with the least infrastructure / application code to maintain.

API Gateway with usage plans & API Keys seems to be an effective way to make data available at low volumes / request rates in a way that reduces risk for making this API endpoints available with authentication.

#!/bin/bash

export AWS_DEFAULT_REGION=eu-west-1

# Create our telemetry bucket for localstack
awslocal s3 mb s3://dev-pressreader  || true

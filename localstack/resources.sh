#!/bin/bash

export AWS_DEFAULT_REGION=eu-west-1

# Set CAPI_API_KEY from real AWS values
CAPI_API_KEY=$(AWS_REGION=eu-west-1 AWS_PROFILE=printProd \
  aws secretsmanager get-secret-value \
  --secret-id /DEV/print-production/pressreader/capiToken \
  --query "SecretString" \
  --output text)

awslocal secretsmanager delete-secret \
  --secret-id "/DEV/print-production/pressreader/capiToken" \
  --force-delete-without-recovery || true

awslocal secretsmanager create-secret \
  --name /DEV/print-production/pressreader/capiToken \
  --secret-string $CAPI_API_KEY 

# Create our telemetry bucket for localstack
awslocal s3 mb s3://dev-pressreader  || true

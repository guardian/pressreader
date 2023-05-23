#!/bin/bash

export AWS_DEFAULT_REGION=eu-west-1

awslocal secretsmanager delete-secret \
  --secret-id "/DEV/print-production/pressreader/capiToken" \
  --force-delete-without-recovery || true

# Add a hmac secret
awslocal secretsmanager create-secret \
  --name /DEV/print-production/pressreader/capiToken \
  --secret-string changeme 

# Create our telemetry bucket for localstack
awslocal s3 mb s3://dev-pressreader  || true

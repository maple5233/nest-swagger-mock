#!/usr/bin/env sh

# We don't have /bin/bash in node:alpine

set -e
rm -rf dist
npx tsc --project tsconfig.build.json
npx tsc-alias

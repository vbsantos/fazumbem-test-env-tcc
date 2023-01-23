#!/bin/bash

echo "Running E2E Cypress tests"

cd acceptance-tests/
npm install
npm run start

docker compose down --volumes
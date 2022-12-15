#!/bin/bash

echo "Running E2E Cypress tests"

cd acceptance-tests/ && npm run start

#!/bin/bash

# Run linter and build
npm run eslint && npm run build

# Check if linting and building were successful
if [ $? -eq 0 ]; then
  # Deploy to AWS Elastic Beanstalk
  eb deploy
else
  echo "Linting or build failed. Not deploying."
fi

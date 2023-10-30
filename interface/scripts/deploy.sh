#!/bin/bash

# Deploy to AWS Elastic Beanstalk
aws eb deploy

# If the deployment was successful, notify QA Wolf
if [ $? -eq 0 ]; then
    curl -H "Authorization: qawolf_7ce27862dbf74bc89101831fcd316af4" -H "Content-Type: application/json" https://app.qawolf.com/api/webhooks/deploy_success
else
    echo "Deployment failed. Not notifying QA Wolf."
fi

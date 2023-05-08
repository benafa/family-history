#!/bin/bash

# Source environment variables from file
source deployment-env-variables 

# Check if DEV_PATH environment variable is set
if [ -z "$DEV_PATH" ]; then
  echo "Error: DEV_PATH environment variable is not set. Please set DEV_PATH to the path of your project-dev repository."
  exit 1
fi

# Check if PROD_PATH environment variable is set
if [ -z "$PROD_PATH" ]; then
  echo "Error: PROD_PATH environment variable is not set. Please set PROD_PATH to the path of your project-prod repository."
  exit 1
fi

# Check if DEV_PATH and PROD_PATH are different paths
if [ "$DEV_PATH" = "$PROD_PATH" ]; then
  echo "Error: DEV_PATH and PROD_PATH must be different paths. Please set them to different paths."
  exit 1
fi

# Check if commit message is provided as argument
if [ -z "$1" ]; then
  echo "Error: Commit message not provided."
  echo "Please provide a commit message as an argument."
  exit 1
fi

# Assign commit message to variable
COMMIT_MSG="$1"

# Path to project-dev repository
PROJECT_DEV_PATH=$DEV_PATH

# Path to project-prod repository
PROJECT_PROD_PATH=$PROD_PATH

# Make sure the main branch of project-dev is up-to-date
cd $PROJECT_DEV_PATH
git checkout main
# git pull

# website is within docs folder
cd docs

# Create copy of the dev config
cp $PROJECT_DEV_PATH/docs/_config.yml $PROJECT_DEV_PATH/docs/_config_dev.yml

if python3 $PROJECT_DEV_PATH/orchestration/deployment/update_baseurl.py $PROJECT_DEV_PATH/docs/_config.yml "" "https://colombochetty.com/"; then
  echo "Updated baseurl in _config.yml."
else
  echo "Error: Failed to update baseurl in _config.yml."
  exit 1
fi

# Build Jekyll website in project-dev repository
# Install Jekyll dependencies if Gemfile.lock does not exist
if [ ! -f "$PROJECT_DEV_PATH/docs/Gemfile.lock" ]; then
  bundle install
fi
bundle exec jekyll build

# Delete old contents of project-prod repository (excluding .git and _config.yml)
cd $PROJECT_PROD_PATH
find . -type f -not -path '*/\.*' -delete
find . -type d -empty -delete

# Copy new contents from project-dev to project-prod
cp -r $PROJECT_DEV_PATH/docs/_site/* $PROJECT_PROD_PATH

cp $PROJECT_DEV_PATH/orchestration/deployment/CNAME $PROJECT_PROD_PATH

# Copy back the dev config 
cp $PROJECT_DEV_PATH/docs/_config_dev.yml $PROJECT_DEV_PATH/docs/_config.yml
rm $PROJECT_DEV_PATH/docs/_config_dev.yml

# Commit and push changes to project-prod repository
cd $PROJECT_PROD_PATH
git add .
git commit -m "$COMMIT_MSG"
git push
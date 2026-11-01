#!/bin/bash

# Usage:
#   ./deploy.sh "commit message"   Build the latest commit on main and publish it
#   ./deploy.sh --dry-run          Build and check the current commit, publish nothing
#
# The site is built in a temporary copy of the last commit, so uncommitted work
# never ships and a failed build leaves this repo and project-prod untouched.

# Stop on the first error, so a failed build can never reach project-prod
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Source environment variables from file
source "$SCRIPT_DIR/deployment-env-variables"

DRY_RUN=false
if [ "${1:-}" = "--dry-run" ]; then
  DRY_RUN=true
  shift
fi

# Check that the required variables and tools are set
for var in DEV_PATH PROD_PATH RUBY_BIN PYTHON_BIN BUNDLE_GEMFILE BUNDLE_PATH; do
  if [ -z "${!var:-}" ]; then
    echo "Error: $var is not set. Please set it in deployment-env-variables."
    exit 1
  fi
done

if [ ! -x "$RUBY_BIN/bundle" ] || [ ! -x "$PYTHON_BIN" ]; then
  echo "Error: Ruby or Python not found. Check RUBY_BIN and PYTHON_BIN in deployment-env-variables."
  exit 1
fi

# Check if DEV_PATH and PROD_PATH are different paths
if [ "$DEV_PATH" = "$PROD_PATH" ]; then
  echo "Error: DEV_PATH and PROD_PATH must be different paths. Please set them to different paths."
  exit 1
fi

export PATH="$RUBY_BIN:$PATH"
export LANG=en_US.UTF-8 LC_ALL=en_US.UTF-8
export BUNDLE_GEMFILE BUNDLE_PATH
export BUNDLE_APP_CONFIG="$(dirname "$BUNDLE_GEMFILE")/.bundle"

cd "$DEV_PATH"

if [ "$DRY_RUN" = true ]; then
  if [ -n "$(git status --porcelain)" ]; then
    echo "Note: uncommitted changes are not part of this build."
  fi
else
  # Check if commit message is provided as argument
  if [ -z "${1:-}" ]; then
    echo "Error: Commit message not provided."
    echo "Please provide a commit message as an argument."
    exit 1
  fi

  if [ "$(git rev-parse --abbrev-ref HEAD)" != "main" ]; then
    echo "Error: Switch to main before deploying."
    exit 1
  fi

  if [ -n "$(git status --porcelain)" ]; then
    echo "Error: Commit your changes before deploying."
    git status --short
    exit 1
  fi

  if [ "$(git -C "$PROD_PATH" rev-parse --abbrev-ref HEAD)" != "main" ]; then
    echo "Error: project-prod is not on main."
    exit 1
  fi

  git -C "$PROD_PATH" fetch --quiet
  if [ "$(git -C "$PROD_PATH" rev-list --count HEAD..@{u})" != "0" ]; then
    echo "Error: project-prod is behind GitHub. Run git pull there first."
    exit 1
  fi

  if [ "$(git rev-list --count @{u}..HEAD)" != "0" ]; then
    echo "Warning: main has commits that are not pushed to GitHub yet."
  fi
fi

COMMIT_HASH=$(git rev-parse --short HEAD)

# Build in a temporary copy of the last commit
BUILD_PATH=$(mktemp -d)
trap 'rm -rf "$BUILD_PATH"' EXIT

git archive HEAD docs webpack orchestration | tar -x -C "$BUILD_PATH"
cp "$DEV_PATH"/webpack/.env.* "$BUILD_PATH/webpack/"
ln -s "$DEV_PATH/webpack/node_modules" "$BUILD_PATH/webpack/node_modules"

# build webpack prod to get prod assets (js/css)
cd "$BUILD_PATH/webpack"
npm run prod-build

"$PYTHON_BIN" "$BUILD_PATH/orchestration/deployment/update_baseurl.py" "$BUILD_PATH/docs/_config.yml" "" "https://colombochetty.com/"
echo "Updated baseurl in _config.yml."

# website is within docs folder
cd "$BUILD_PATH/docs"
bundle exec jekyll build

# Check the build looks complete before touching project-prod
SITE_PATH="$BUILD_PATH/docs/_site"
for required in index.html people.html trees.html assets/js/dynamic_tree.js assets/css/main.css; do
  if [ ! -s "$SITE_PATH/$required" ]; then
    echo "Error: build is missing $required. Nothing was published."
    exit 1
  fi
done

BUILT_FILES=$(find "$SITE_PATH" -type f | wc -l | tr -d ' ')
PROD_FILES=$(find "$PROD_PATH" -type f -not -path '*/\.*' | wc -l | tr -d ' ')
if [ "$BUILT_FILES" -lt $((PROD_FILES * 9 / 10)) ]; then
  echo "Error: build has $BUILT_FILES files but project-prod has $PROD_FILES. Nothing was published."
  exit 1
fi

if [ "$DRY_RUN" = true ]; then
  echo "Dry run passed for $COMMIT_HASH: built $BUILT_FILES files (project-prod has $PROD_FILES). Nothing was published."
  exit 0
fi

deployment_commit_summary="${COMMIT_HASH}: $1"

# Delete old contents of project-prod repository (excluding .git and _config.yml)
cd "$PROD_PATH"
find . -type f -not -path '*/\.*' -delete
find . -type d -empty -delete

# Copy new contents from the build to project-prod
cp -r "$SITE_PATH"/* "$PROD_PATH"

cp "$DEV_PATH/orchestration/deployment/CNAME" "$PROD_PATH"

# Commit and push changes to project-prod repository
git add .
if git diff --cached --quiet; then
  echo "Nothing changed, so there is nothing to publish."
  exit 0
fi
git commit -m "$deployment_commit_summary"
git push

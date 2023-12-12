#!/bin/bash

# Default values
PORT=4001
INCREMENTAL=""

# Function to display usage
usage() {
    echo "Usage: $0 [-p port] [-i]"
    echo "  -p port       Specify the port number for the Jekyll server (default: 4001)"
    echo "  -i            Enable incremental build"
    exit 1
}

# Parse command-line options
while getopts ":p:i" opt; do
  case ${opt} in
    p )
      PORT=$OPTARG
      ;;
    i )
      INCREMENTAL="--incremental"
      ;;
    \? )
      echo "Invalid Option: -$OPTARG" 1>&2
      usage
      ;;
    : )
      echo "Invalid Option: -$OPTARG requires an argument" 1>&2
      usage
      ;;
  esac
done

# Start Jekyll server
cd docs
bundle exec jekyll serve --port $PORT $INCREMENTAL
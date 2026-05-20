#!/bin/bash

# Exit on error
set -e

# Variables
IMAGE_NAME="hafizsikandar/hafiz-sikandar-portfolio"
TAG="latest"

echo "Building Docker image..."
docker buildx build \
  --platform linux/amd64 \
  -t $IMAGE_NAME:$TAG \
  --push .

echo "Done!"
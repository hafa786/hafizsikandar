#!/bin/bash

set -e

IMAGE="hafizsikandar/hafiz-sikandar-portfolio:latest"
CONTAINER_NAME="hafizsikandar_app"

echo "======================================"
echo " Docker Deployment Script"
echo " Image: $IMAGE"
echo "======================================"

# 1. Check if Docker is installed
if ! command -v docker &> /dev/null
then
    echo "Docker is not installed. Exiting..."
    exit 1
fi

# 2. Check Docker daemon
if ! docker info &> /dev/null
then
    echo "Docker daemon is not running. Starting..."
    sudo systemctl start docker
fi

# 3. Login check (optional but helpful)
echo "Checking Docker login status..."
docker info | grep Username || echo "Not logged in (continuing anyway)..."

# 4. Pull latest image
echo "Pulling image: $IMAGE"
docker pull $IMAGE

# 5. Stop old container if running
if [ "$(docker ps -q -f name=$CONTAINER_NAME)" ]; then
    echo "Stopping running container..."
    docker stop $CONTAINER_NAME
fi

# 6. Remove old container if exists
if [ "$(docker ps -aq -f name=$CONTAINER_NAME)" ]; then
    echo "Removing old container..."
    docker rm $CONTAINER_NAME
fi

# 7. Run new container
echo "Starting new container..."
docker run -d \
  --name hafizsikandar_app \
  -p 127.0.0.1:3001:80 \
  hafizsikandar/hafiz-sikandar-portfolio:latest

# 8. Show status
echo "Container status:"
docker ps | grep $CONTAINER_NAME || true

echo "======================================"
echo " Deployment complete!"
echo "======================================"

# ======================
# STATUS
# ======================
echo ""
echo "✅ Deployment successful!"
echo "--------------------------------"
docker ps | grep $CONTAINER_NAME || true
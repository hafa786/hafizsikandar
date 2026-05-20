#!/bin/bash

# ==========================================
# Subdomain Setup Script
# Domain: hafiz-sikandar.darmisolutions.com
# VPS: Ubuntu + Nginx + Docker
# ==========================================

set -e

SUBDOMAIN="hafiz-sikandar.darmisolutions.com"
APP_PORT="3001"
NGINX_FILE="hafiz-sikandar"

echo "========================================="
echo " Setting up subdomain: $SUBDOMAIN"
echo "========================================="

# ------------------------------------------
# Install nginx if missing
# ------------------------------------------
if ! command -v nginx &> /dev/null
then
    echo "Installing Nginx..."
    sudo apt update
    sudo apt install nginx -y
fi

# ------------------------------------------
# Remove default nginx site (optional)
# ------------------------------------------
if [ -f /etc/nginx/sites-enabled/default ]; then
    echo "Removing default Nginx config..."
    sudo rm -f /etc/nginx/sites-enabled/default
fi

# ------------------------------------------
# Create nginx config
# ------------------------------------------
echo "Creating Nginx config..."

sudo tee /etc/nginx/sites-available/$NGINX_FILE > /dev/null <<EOF
server {
    listen 80;
    server_name $SUBDOMAIN;

    location / {
        proxy_pass http://127.0.0.1:$APP_PORT;

        proxy_http_version 1.1;

        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }
}
EOF

# ------------------------------------------
# Enable site
# ------------------------------------------
if [ ! -L /etc/nginx/sites-enabled/$NGINX_FILE ]; then
    echo "Enabling Nginx site..."
    sudo ln -s /etc/nginx/sites-available/$NGINX_FILE /etc/nginx/sites-enabled/
fi

# ------------------------------------------
# Test nginx config
# ------------------------------------------
echo "Testing Nginx configuration..."
sudo nginx -t

# ------------------------------------------
# Restart nginx
# ------------------------------------------
echo "Reloading Nginx..."
sudo systemctl restart nginx

# ------------------------------------------
# Install Certbot if missing
# ------------------------------------------
if ! command -v certbot &> /dev/null
then
    echo "Installing Certbot..."
    sudo apt install certbot python3-certbot-nginx -y
fi

# ------------------------------------------
# Generate SSL certificate
# ------------------------------------------
echo "Generating SSL certificate..."

sudo certbot --nginx \
    -d $SUBDOMAIN \
    --non-interactive \
    --agree-tos \
    --redirect \
    -m admin@$SUBDOMAIN || true

# ------------------------------------------
# Final status
# ------------------------------------------
echo "========================================="
echo " Subdomain setup complete!"
echo " URL: https://$SUBDOMAIN"
echo " Proxy Port: 127.0.0.1:$APP_PORT"
echo "========================================="
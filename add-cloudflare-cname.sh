#!/bin/bash

# Cloudflare CNAME Setup Script for ai-readiness.azumo.com

echo "=== Cloudflare CNAME Record Setup ==="
echo "This script will add a CNAME record for ai-readiness.azumo.com"
echo ""
echo "You'll need:"
echo "1. Your Cloudflare API Token (with DNS edit permissions)"
echo "2. Your Zone ID (found in Cloudflare dashboard)"
echo ""
echo "To get these:"
echo "- API Token: Cloudflare Dashboard → My Profile → API Tokens → Create Token"
echo "- Zone ID: Cloudflare Dashboard → azumo.com → Overview (right sidebar)"
echo ""
read -p "Enter your Cloudflare API Token: " CF_API_TOKEN
read -p "Enter your Zone ID for azumo.com: " CF_ZONE_ID

# API endpoint
API_URL="https://api.cloudflare.com/client/v4/zones/${CF_ZONE_ID}/dns_records"

# Create CNAME record
echo ""
echo "Creating CNAME record..."

curl -X POST "${API_URL}" \
  -H "Authorization: Bearer ${CF_API_TOKEN}" \
  -H "Content-Type: application/json" \
  --data '{
    "type": "CNAME",
    "name": "ai-readiness",
    "content": "cname.vercel-dns.com",
    "ttl": 1,
    "proxied": false
  }' | python3 -m json.tool

echo ""
echo "Done! Your CNAME record should be created."
echo "DNS propagation usually takes 5-30 minutes."
echo ""
echo "Once propagated, your site will be available at:"
echo "https://ai-readiness.azumo.com"
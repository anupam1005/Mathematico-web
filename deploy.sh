#!/bin/bash

echo "🚀 Deploying Mathematico Backend API to Vercel..."

# Check if vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Installing..."
    npm install -g vercel
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Deploy to Vercel
echo "🚀 Deploying to Vercel..."
vercel --prod

echo "✅ Deployment complete!"
echo "🌐 API will be available at: https://mathematico-backend-new.vercel.app/api/v1"
echo "🔍 Test the API: curl https://mathematico-backend-new.vercel.app/api/v1/health"

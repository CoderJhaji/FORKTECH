#!/bin/bash

# AWS Deployment Quick Start Script
# This script helps deploy the Recipes app to AWS

echo "🚀 Recipes App - AWS Deployment Script"
echo "========================================"
echo ""

# Check prerequisites
echo "Checking prerequisites..."

if ! command -v aws &> /dev/null; then
    echo "❌ AWS CLI not found. Install from: https://aws.amazon.com/cli/"
    exit 1
fi

if ! command -v eb &> /dev/null; then
    echo "❌ Elastic Beanstalk CLI not found. Install with: pip install awsebcli"
    exit 1
fi

echo "✓ AWS CLI and EB CLI found"
echo ""

# Get AWS region
read -p "Enter AWS region (us-east-1): " REGION
REGION=${REGION:-us-east-1}

# Get MongoDB URI
read -p "Enter MongoDB Atlas connection string: " MONGO_URI

# Get other environment variables
read -p "Enter JWT secret key: " JWT_SECRET
read -p "Enter Gemini API key: " GEMINI_API_KEY

echo ""
echo "📦 Deploying Backend to Elastic Beanstalk..."

cd backend

# Initialize EB if not already initialized
if [ ! -d ".elasticbeanstalk" ]; then
    echo "Initializing Elastic Beanstalk..."
    eb init -p node.js-18 recipes-backend --region $REGION
    eb create recipes-backend-env
else
    echo "Elastic Beanstalk already initialized"
fi

# Set environment variables
echo "Setting environment variables..."
eb setenv MONGO_URI="$MONGO_URI"
eb setenv JWT_SECRET="$JWT_SECRET"
eb setenv GEMINI_API_KEY="$GEMINI_API_KEY"
eb setenv NODE_ENV="production"

# Deploy
echo "Deploying..."
eb deploy

# Get the backend URL
BACKEND_URL=$(eb open --print-url)
echo ""
echo "✓ Backend deployed!"
echo "Backend URL: $BACKEND_URL"

cd ..

echo ""
echo "📱 Frontend Deployment (Manual)"
echo "================================"
echo ""
echo "1. Go to https://console.aws.amazon.com/amplify"
echo "2. Click 'New app' → 'Host web app'"
echo "3. Select GitHub and authorize"
echo "4. Choose CoderJhaji/FORKTECH repository"
echo "5. Select 'main' branch"
echo "6. Add environment variable:"
echo "   VITE_API_URL=$BACKEND_URL/api"
echo "7. Click 'Deploy'"
echo ""
echo "🎉 Done! Your app will be deployed automatically"


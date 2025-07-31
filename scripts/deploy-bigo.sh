#!/bin/bash

# Deploy script for Bigo app
echo "🚀 Starting Bigo deployment..."

echo "✅ Using project-specific .dockerignore for Bigo"

# Get project ID
PROJECT_ID=$(gcloud config get-value project)
IMAGE_NAME="gcr.io/$PROJECT_ID/bigo-frontend"

echo "📦 Building Bigo image..."
echo "🔧 Project ID: $PROJECT_ID"
echo "🏷️  Image: $IMAGE_NAME"

# Build Docker image (using root context)
docker build -f projects/bigo/Dockerfile -t $IMAGE_NAME .

if [ $? -eq 0 ]; then
    echo "✅ Docker build successful"
    
    echo "📤 Pushing image to Google Container Registry..."
    docker push $IMAGE_NAME
    
    if [ $? -eq 0 ]; then
        echo "✅ Image pushed successfully"
        
        echo "🚀 Deploying to Cloud Run..."
        gcloud run deploy bigo-frontend \
            --image $IMAGE_NAME \
            --platform managed \
            --region us-central1 \
            --port 3001 \
            --allow-unauthenticated \
            --memory 512Mi \
            --cpu 1 \
            --max-instances 10
        
        if [ $? -eq 0 ]; then
            echo "✅ Bigo deployed successfully!"
            echo "🌐 Service URL: $(gcloud run services describe bigo-frontend --region us-central1 --format='value(status.url)')"
        else
            echo "❌ Cloud Run deployment failed"
            exit 1
        fi
    else
        echo "❌ Docker push failed"
        exit 1
    fi
else
    echo "❌ Docker build failed"
    exit 1
fi

echo "🎉 Bigo deployment completed!" 

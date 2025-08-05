# Frontend Integration with Global Load Balancer

This document describes the steps to integrate new frontends with the Global Load Balancer after deploying to Cloud Run.

## 📋 Prerequisites

- Global Load Balancer already configured
- Frontend deployed on Cloud Run
- GCP project access configured
- Permissions for Compute Engine and Cloud Run

## 🚀 Integration Steps

### 1. Verify Frontend Deployment

First, confirm that the frontend was deployed correctly:

```bash
# Check if service is active
gcloud run services list --region us-central1

# Check service details
gcloud run services describe [SERVICE_NAME] --region us-central1
```

### 2. Create Network Endpoint Group (NEG)

Create a NEG to connect Cloud Run to the Load Balancer:

```bash
# Create NEG for the new frontend
gcloud compute network-endpoint-groups create [SERVICE_NAME]-neg \
  --region=us-central1 \
  --network-endpoint-type=serverless \
  --cloud-run-service=[SERVICE_NAME]
```

**Example:**
```bash
gcloud compute network-endpoint-groups create new-frontend-neg \
  --region=us-central1 \
  --network-endpoint-type=serverless \
  --cloud-run-service=new-frontend
```

### 3. Create Backend Service

Create a specific backend service for the new frontend:

```bash
# Create backend service
gcloud compute backend-services create [SERVICE_NAME]-backend \
  --global \
  --load-balancing-scheme=EXTERNAL_MANAGED \
  --protocol=HTTP \
  --port-name=http
```

**Example:**
```bash
gcloud compute backend-services create new-frontend-backend \
  --global \
  --load-balancing-scheme=EXTERNAL_MANAGED \
  --protocol=HTTP \
  --port-name=http
```

### 4. Add NEG to Backend

Connect the NEG to the backend service:

```bash
# Add NEG to backend
gcloud compute backend-services add-backend [SERVICE_NAME]-backend \
  --global \
  --network-endpoint-group=[SERVICE_NAME]-neg \
  --network-endpoint-group-region=us-central1
```

**Example:**
```bash
gcloud compute backend-services add-backend new-frontend-backend \
  --global \
  --network-endpoint-group=new-frontend-neg \
  --network-endpoint-group-region=us-central1
```

### 5. Configure IAM

Configure permissions for Cloud Run:

```bash
# Configure IAM for the frontend
gcloud run services add-iam-policy-binding [SERVICE_NAME] \
  --region=us-central1 \
  --member=allUsers \
  --role=roles/run.invoker
```

**Example:**
```bash
gcloud run services add-iam-policy-binding new-frontend \
  --region=us-central1 \
  --member=allUsers \
  --role=roles/run.invoker
```

### 6. Enable CDN (Optional)

To improve performance, enable CDN:

```bash
# Enable CDN on backend
gcloud compute backend-services update [SERVICE_NAME]-backend --global --enable-cdn
```

**Example:**
```bash
gcloud compute backend-services update new-frontend-backend --global --enable-cdn
```

### 7. Configure Routing in URL Map

Add the route to the Load Balancer URL Map:

```bash
# Add route for the new frontend
gcloud compute url-maps add-path-matcher lb-url-map \
  --path-matcher-name=frontend-matcher \
  --default-service=api-backend \
  --path-rules="/[ROUTE]=[SERVICE_NAME]-backend"
```

**Example:**
```bash
gcloud compute url-maps add-path-matcher lb-url-map \
  --path-matcher-name=frontend-matcher \
  --default-service=api-backend \
  --path-rules="/new=new-frontend-backend"
```

### 8. Configure Domain (Optional)

To use custom domain, add to URL Map:

```bash
# Add custom domain
gcloud compute url-maps add-host-rule lb-url-map \
  --hosts="[DOMAIN]" \
  --path-matcher-name=frontend-matcher
```

**Example:**
```bash
gcloud compute url-maps add-host-rule lb-url-map \
  --hosts="new-frontend-696345213246.us-central1.run.app" \
  --path-matcher-name=frontend-matcher
```

## 🔍 Integration Verification

### Test via Static IP

```bash
# Test new frontend route
curl -I http://34.54.92.191:443/[ROUTE]

# Test custom domain
curl -I https://[DOMAIN]
```

### Test via Cloud Run Domain

```bash
# Test direct Cloud Run domain
curl -I https://[SERVICE_NAME]-696345213246.us-central1.run.app
```

## 📊 Final Structure

After integration, you will have:

### **Configured Backends:**
- `api-backend` → recharge-api
- `bigo-backend` → bigo-frontend
- `store-backend` → store-frontend
- `[NEW]-backend` → [NEW]-frontend

### **Configured Routes:**
- `/api` → api-backend
- `/bigo` → bigo-backend
- `/store` → store-backend
- `/[NEW_ROUTE]` → [NEW]-backend

### **Domains:**
- `bigo-frontend-696345213246.us-central1.run.app` → bigo-backend
- `store-frontend-696345213246.us-central1.run.app` → store-backend
- `[NEW]-frontend-696345213246.us-central1.run.app` → [NEW]-backend

## ⚠️ Troubleshooting

### Common Issues

1. **"NEG not found" error:**
   - Verify NEG was created correctly
   - Confirm Cloud Run service name

2. **Permission error:**
   - Verify IAM was configured
   - Confirm service is public

3. **Route not working:**
   - Verify route was added to URL Map
   - Confirm backend is connected

4. **CDN not working:**
   - Verify CDN was enabled
   - Wait a few minutes for propagation

### Debug Logs

```bash
# Check backend status
gcloud compute backend-services describe [SERVICE_NAME]-backend --global

# Check URL Map
gcloud compute url-maps describe lb-url-map

# Check NEG
gcloud compute network-endpoint-groups describe [SERVICE_NAME]-neg --region=us-central1
```

## 🔄 Updates

To update an integrated frontend:

1. **Deploy new frontend:**
   ```bash
   ./scripts/deploy-[NAME].sh
   ```

2. **Load Balancer automatically detects** changes in Cloud Run

3. **No need to reconfigure** the Load Balancer

## 📝 Complete Example

### Integrating a frontend called "admin":

```bash
# 1. Verify deployment
gcloud run services describe admin-frontend --region us-central1

# 2. Create NEG
gcloud compute network-endpoint-groups create admin-frontend-neg \
  --region=us-central1 \
  --network-endpoint-type=serverless \
  --cloud-run-service=admin-frontend

# 3. Create backend
gcloud compute backend-services create admin-backend \
  --global \
  --load-balancing-scheme=EXTERNAL_MANAGED \
  --protocol=HTTP \
  --port-name=http

# 4. Connect NEG to backend
gcloud compute backend-services add-backend admin-backend \
  --global \
  --network-endpoint-group=admin-frontend-neg \
  --network-endpoint-group-region=us-central1

# 5. Configure IAM
gcloud run services add-iam-policy-binding admin-frontend \
  --region=us-central1 \
  --member=allUsers \
  --role=roles/run.invoker

# 6. Enable CDN
gcloud compute backend-services update admin-backend --global --enable-cdn

# 7. Add route
gcloud compute url-maps add-path-matcher lb-url-map \
  --path-matcher-name=frontend-matcher \
  --default-service=api-backend \
  --path-rules="/admin=admin-backend"

# 8. Add domain
gcloud compute url-maps add-host-rule lb-url-map \
  --hosts="admin-frontend-696345213246.us-central1.run.app" \
  --path-matcher-name=frontend-matcher

# 9. Test
curl -I http://34.54.92.191:443/admin
curl -I https://admin-frontend-696345213246.us-central1.run.app
```

---

**Note:** This documentation assumes the Global Load Balancer is already configured. For initial setup, refer to the specific Load Balancer documentation. 

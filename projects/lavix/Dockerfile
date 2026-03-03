# Dockerfile for Bigo app
FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy dependency files
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
COPY projects/bigo/package.json ./projects/bigo/
COPY packages/ ./packages/
COPY setup/ ./setup/

# Install dependencies
RUN yarn install

# Rebuild the application only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules

# Copy workspace files (packages and setup are essential)
COPY packages/ ./packages/
COPY setup/ ./setup/
COPY projects/bigo/ ./projects/bigo/
COPY package.json yarn.lock ./

# Build Bigo application
RUN yarn workspace @4miga/bigo build

# Production image, copy only the necessary files
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy necessary files
COPY --from=builder /app/projects/bigo/.next/standalone ./
COPY --from=builder /app/projects/bigo/.next/static ./projects/bigo/.next/static

USER nextjs

EXPOSE 3001

ENV PORT 3001
ENV HOSTNAME "0.0.0.0"

CMD ["node", "projects/bigo/server.js"] 

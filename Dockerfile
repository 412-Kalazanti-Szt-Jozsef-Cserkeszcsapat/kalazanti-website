# Stage 1: Build the Angular application
FROM node:20-alpine AS build

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the Angular application with SSR
RUN npm run build

# Stage 2: Run the application
FROM node:20-alpine AS production

WORKDIR /app

# Copy the built application from build stage
COPY --from=build /app/dist ./dist
COPY --from=build /app/package*.json ./

# Install only production dependencies
RUN npm ci --only=production

# Expose the port the app runs on
EXPOSE 4000

# Start the SSR server
CMD ["node", "dist/kalazanti-website/server/server.mjs"]

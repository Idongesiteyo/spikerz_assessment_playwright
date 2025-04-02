# Use Node.js as the base image
FROM mcr.microsoft.com/playwright:v1.51.1-jammy

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY tsconfig.json ./

# Install dependencies
RUN npm ci
RUN npm install playwright
RUN npx playwright install-deps
RUN npm install --save-dev @types/express

# Copy the entire project
COPY . .

# Build TypeScript files
RUN npx tsc

# Expose API port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
CMD node healthcheck.js || exit 1

# Start the server
CMD ["node", "dist/server.js"]
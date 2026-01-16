# Use Node 22 Alpine
FROM node:22-alpine AS build

# Install pnpm
RUN npm install -g pnpm

# Set working directory
WORKDIR /app

# Copy package.json and lock file
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy project files
COPY . .

# Build the project
RUN pnpm build

FROM node:22-alpine AS runtime

# Set working directory
WORKDIR /app

# Copy the built files from the build stage
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/public ./public
COPY --from=build /app/.next/static ./static

# Expose port 3000
EXPOSE 3000

# Start the app
CMD ["node", "server.js"]

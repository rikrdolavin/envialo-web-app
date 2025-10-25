# Use Node 22 Alpine
FROM node:22-alpine

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

# Expose port 3000
EXPOSE 3000

# Start the app
CMD ["pnpm", "start"]

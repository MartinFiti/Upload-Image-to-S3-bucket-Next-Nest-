FROM node:18-alpine AS builder

# Set the working directory
WORKDIR /app

# Install dependencies
COPY ./frontend/package*.json ./
RUN npm install

# Copy the rest of the code and build the Next.js application
COPY ./frontend .
RUN npm run build

# Run the production environment
FROM node:18-alpine AS runner

WORKDIR /app

# Copy the built Next.js app from the builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./

ENV NODE_ENV development
# Expose the port the Next.js app runs on
EXPOSE 3001

# Start the Next.js app
CMD ["npm", "run", "dev"]

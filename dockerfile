# Stage 1 — Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files and install deps
COPY package*.json ./
RUN npm install

# Copy the rest of the code
COPY . .

# Build TypeScript to /dist
RUN npm run build


# Stage 2 — Production stage
FROM node:20-alpine

WORKDIR /app

# Only copy necessary files
COPY package*.json ./
RUN npm install --production

# Copy compiled JS from builder stage
COPY --from=builder /app/dist ./dist

# Expose your backend port
EXPOSE 3000

ARG MONGO_URL
ARG JWT_SECRET
ENV MONGO_URL=$MONGO_URL
ENV JWT_SECRET=$JWT_SECRET

# Start the server
CMD ["node", "dist/index.js"]

# Use official Node base image
FROM node:20-alpine

# Set working directory inside container
WORKDIR /app

# Copy package files first (for caching optimization)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all source code
COPY . .

# Expose app port
EXPOSE 3000

# Start the app
CMD ["node", "app.js"]
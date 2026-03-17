# Use the official lightweight Node.js image
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application
COPY . .

# Expose the port your Express server uses
EXPOSE 3000

# Start the Architect server
CMD ["node", "server.js"]
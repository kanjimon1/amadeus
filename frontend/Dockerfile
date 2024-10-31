#FROM node:14
#WORKDIR /app
#COPY package*.json ./
#RUN npm install
#COPY . .
#RUN npm run build
#EXPOSE 3000
#CMD ["npm", "start"]

# Use a newer Node.js version
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose port (if needed for the frontend)
EXPOSE 3000

# Run the application
CMD ["npm", "start"]

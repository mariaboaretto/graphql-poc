# Use the official Node.js runtime as the base image
FROM node:18 as build
# Set the working directory in the container
WORKDIR /app
# Copy package.json and package-lock.json to the working directory
COPY package*.json ./
# Install dependencies
RUN npm install
# Copy the entire application code to the container
COPY . .
# Build the React app for production
RUN npm run build

# Use Nginx as the production server
FROM nginx:alpine
# Copying local nginx config file
COPY nginx.config /etc/nginx/conf.d/default.conf
# Copy the built React app to Nginx's web server directory
COPY --from=build /app/build /usr/share/nginx/html
# Start Nginx when the container runs
# CMD ["nginx", "-g", "daemon off;"]
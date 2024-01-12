# Official Node.js runtime as base image
FROM node:14

# Setting working directory
WORKDIR /app

# Copying package-json and package-lock.json into current directory
COPY package*.json ./

# Installing dependencies
RUN npm install

# Copy the application code to the working directory
COPY . .

ENV PORT=4000

# Expose the port that the app will run o
EXPOSE 4000

CMD ["node", "/app/server/server.js"]


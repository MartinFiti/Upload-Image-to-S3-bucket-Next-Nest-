# Base image
FROM node:18

# Create app directory
WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY ./backend/package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY ./backend .

# Copy the .env and .env.development files
COPY ./backend/.env ./

# Creates a "dist" folder with the production build
RUN npm run build

# Expose the port on which the app will run
EXPOSE 9000

# Start the server using the production build
CMD ["npm", "run", "start"]
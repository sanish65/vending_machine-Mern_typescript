#  Dockerfile for Node Express Backend

FROM node:14-slim

# Create App Directory
WORKDIR /usr/src/app

# Install Dependencies
COPY package*.json ./

RUN yarn install

# Copy app source code
COPY . .

# Exports
EXPOSE 4000

CMD ["yarn","start"]
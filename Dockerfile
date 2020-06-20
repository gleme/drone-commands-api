FROM node:12-alpine
WORKDIR /usr/drone-commands-api

# Install app dependencies
COPY package*.json ./

RUN npm install

# Copy source files
COPY . .

EXPOSE 5000

CMD [ "npm", "run", "start:dev"]

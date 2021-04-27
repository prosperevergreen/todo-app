# This line fetches the Node Docker image with tag "10"
# from Docker Hub.
FROM node:12-alpine

# Create app directory
WORKDIR /usr/src/app

ENV ACCESS_TOKEN_SECRET=8658903a27c74956aaef36c8df78034c7cb6750c239e9f972a8c3ce9fdcab36db552a06b4f82bfce615818edba9c3e6602818ecfdc35a5fda122e2bc2644d8b9

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# dev mode
# RUN npm install -g nodemon 

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 5000

# Get wait for container script
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.8.0/wait /wait

RUN chmod +x /wait

CMD [ "npm", "start" ]


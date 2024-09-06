FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install 

COPY . .

USER node

CMD [ "node", "index.js" ]
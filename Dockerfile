FROM node:20-alpine3.17

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i -g ts-node tsc 

RUN npm i

RUN rm -rf dist

RUN npx tsc

EXPOSE 3000

CMD ["node","dist/index.js"]

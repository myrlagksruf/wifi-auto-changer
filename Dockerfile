FROM node:current-alpine3.16
WORKDIR /usr/src/app
COPY . .
RUN npm i
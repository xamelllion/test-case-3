FROM node:slim

WORKDIR /usr/src/app/frontend

COPY ./public ./public
COPY ./src ./src
COPY ./package.json ./package.json

RUN npm install

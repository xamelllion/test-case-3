FROM node:slim

WORKDIR /usr/src/app/frontend

COPY ./public ./public
COPY ./src ./src
COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json

RUN npm install

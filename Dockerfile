FROM node:latest
FROM npm:latest

ADD . /user

WORKDIR /user/
FROM node:12.18.4

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY ./package.json /usr/src/app

RUN npm install

ADD ./dist /usr/src/app

EXPOSE 8881

CMD ["node", "main.js"]




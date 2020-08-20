FROM node:12.16.3

WORKDIR /usr/src/code

COPY . .

RUN npm install && npm run build

WORKDIR /usr/src/app

RUN mv ../code/dist  ../code/node_modules . && rm -R ../code

EXPOSE 8881

CMD ["node", "main.js"]


FROM node:20-alpine

WORKDIR /app

COPY package*.json .
COPY src ./src
COPY server.js .

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]
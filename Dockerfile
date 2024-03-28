FROM node:18.13.0-alpine3.17

WORKDIR /app

COPY . .

RUN npm install --include=optional

CMD ["npm", "start"]
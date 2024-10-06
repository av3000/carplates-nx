FROM node:18.13.0-alpine3.17

WORKDIR /app

COPY package*.json package-lock.json ./

RUN npm install --include=optional

COPY . .

CMD ["npm", "start"]
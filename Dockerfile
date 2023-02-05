FROM node:18.6.0

WORKDIR /app

COPY package.json /app
COPY yarn.lock /app

RUN yarn install

COPY . .

EXPOSE 8080

CMD ["yarn", "serve"]

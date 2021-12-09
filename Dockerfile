FROM node:12-stretch



WORKDIR /home/node/app


COPY package*.json ./

RUN yarn install


# ENV ACCESS_SECRET_KEY=${ACCESS_SECRET_KEY}

RUN chown -R node:node /home/node/app

# USER node


COPY . .



RUN yarn build

EXPOSE 3000


CMD ["yarn", "start"]
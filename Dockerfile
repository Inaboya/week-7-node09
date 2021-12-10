FROM node:12-stretch AS BUILD_IMAGE



WORKDIR /home/node/app


COPY package*.json ./

RUN yarn install


# ENV ACCESS_SECRET_KEY=${ACCESS_SECRET_KEY}

RUN chown -R node:node /home/node/app

# USER node


COPY . .



RUN yarn build

FROM node:12-stretch

WORKDIR /home/node/app

# copy from build image
COPY --from=BUILD_IMAGE /home/node/app/dist ./dist
COPY --from=BUILD_IMAGE /home/node/app/node_modules ./node_modules

EXPOSE 3000


CMD ["yarn", "start"]
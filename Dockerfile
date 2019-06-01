FROM node:8 AS dependencies

WORKDIR /root/app

ARG PROXY
ENV HTTP_PROXY=$PROXY
ENV HTTPS_PROXY=$PROXY

COPY package.json tsconfig.* .npmrc ./
COPY ./src ./src/

RUN npm install -g npm@latest
RUN npm install --ignore-engines
RUN npm run build

FROM node:8-slim

WORKDIR /home/node/app

RUN chown node:node /home/node/app

COPY --chown=node:node ./src ./src/

COPY --from=dependencies --chown=node:node /root/app/dist ./dist
COPY --from=dependencies --chown=node:node /root/app/node_modules ./node_modules
COPY --from=dependencies --chown=node:node /root/app/package-lock.json .

COPY --chown=node:node *.json ./

USER node

CMD npm start --ignore-engines

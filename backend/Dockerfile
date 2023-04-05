FROM node:16-alpine as builder

ENV NODE_ENV build

USER node
WORKDIR /app

COPY package*.json ./
RUN yarn

COPY --chown=node:node . .
RUN yarn build

# ---

FROM node:16-alpine as runtime

ENV NODE_ENV production

USER node
WORKDIR /app

COPY --from=builder --chown=node:node /app/package*.json ./
COPY --from=builder --chown=node:node /app/node_modules/ ./node_modules/
COPY --from=builder --chown=node:node /app/migrations/ ./migrations/
COPY --from=builder --chown=node:node /app/migrate-mongo-config.js/ ./
COPY --from=builder --chown=node:node /app/dist/ ./dist/

CMD ["yarn", "start:prod"]
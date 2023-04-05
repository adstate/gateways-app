FROM node:16-alpine as builder

WORKDIR /app

COPY . .

COPY package*.json ./
RUN yarn

COPY . .
RUN yarn build

# ---

FROM nginx:1.21.0-alpine as runtime

ENV NODE_ENV production

COPY --from=builder /app/build /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

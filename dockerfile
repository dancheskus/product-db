FROM mhart/alpine-node:latest
RUN yarn global add serve
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn
COPY . .
RUN yarn build
CMD serve -s /app/build
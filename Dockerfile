FROM node:12

WORKDIR /dashboard

COPY package.json yarn.lock /dashboard/

RUN yarn install

COPY . /dashboard/

CMD yarn start

EXPOSE 3000
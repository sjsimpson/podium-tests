FROM cypress/base:16.18.1
WORKDIR /app

COPY package.json .

ENV CI=1
RUN npm i

RUN npx cypress verify

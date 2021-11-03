FROM node:lts-slim

RUN apt-get update
RUN apt-get -y install lm-sensors

RUN mkdir -p /app
WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

ENV INFLUX_ORG=I${NFLUX_ORG}
ENV INFLUX_BUCKET=${INFLUX_BUCKET}
ENV INFLUX_TOKEN=${INFLUX_TOKEN}
ENV INFLUX_URL=${INFLUX_URL}
ENV MONGO_URL=${MONGO_URL}
ENV APP_URL=${APP_URL}
ENV PORT=${PORT}

EXPOSE ${PORT}

CMD ["npm" , "start"]

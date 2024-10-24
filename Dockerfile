FROM node:20-slim

# RUN apt update && apt install -y someting

USER node

RUN mkdir -p /home/node/app

WORKDIR /home/node/app

CMD [ "/home/node/app/recharge-plataform/.docker/start-dev.sh" ]


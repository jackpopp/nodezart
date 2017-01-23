FROM node:7.4

ADD . /

RUN npm install

EXPOSE 3000
CMD ["node", "index", "--cert=certificate.pem"]
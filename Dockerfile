FROM node:alpine
WORKDIR /usr/app

copy . .
RUN npm install

EXPOSE 3000

CMD ["npm", "start"]
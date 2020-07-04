FROM node:12.18.1-alpine
WORKDIR /app
COPY . /app
RUN npm install
CMD [ "npm", "run", "start" ]
FROM node:19.8.1

#create app director
WORKDIR /app

COPY package*.json ./

RUN npm install

#bundle app source
COPY . .

EXPOSE 4000

CMD [ "npm", "run", "start:prod"]

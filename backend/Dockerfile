FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3001

ENV HOST=0.0.0.0

CMD ["npm", "start"] 
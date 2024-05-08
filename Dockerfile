FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm install -g prisma

COPY . .

RUN npx prisma generate

EXPOSE 7345

CMD ["npm", "run", "dev"]
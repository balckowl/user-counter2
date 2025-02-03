FROM node:22.13.1-alpine
WORKDIR /app
COPY ./package*.json ./

# RUNはイメージを作るときに実行
RUN npm install
COPY ./ .

RUN npm run build
EXPOSE 3000

# CMDはコンテナ起動時に実行
CMD ["npm", "start"]

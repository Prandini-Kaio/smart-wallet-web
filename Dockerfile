FROM node:20 AS build
LABEL authors="prandini"

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build --prod

FROM nginx:alpine

COPY --from=build /app/dist/smartwallet /usr/share/nginx/html

EXPOSE 4200

CMD ["nginx", "-g", "daemon off;"]

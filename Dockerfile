# Etapa de build
FROM node:20 AS build
WORKDIR /app
COPY package*.json ./
RUN rm -f package-lock.json && npm install
COPY . .
RUN npm run build --configuration=production

# Etapa final - servir com nginx
FROM nginx:alpine
COPY --from=build /app/dist/unifit/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80

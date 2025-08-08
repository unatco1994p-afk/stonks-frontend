# Stage 1 - build
FROM node:20 AS build
WORKDIR /app

COPY package*.json ./
RUN npm install -g @angular/cli && npm install

COPY . .
RUN ng build --configuration production

# Stage 2 - nginx serve
FROM nginx:alpine
COPY --from=build /app/dist/stonks-frontend/browser /usr/share/nginx/html

# Optional: replace default nginx config for SPA
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Nasz entrypoint, który stworzy/zmieni assets/config.json wg env
COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

EXPOSE 80
ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]

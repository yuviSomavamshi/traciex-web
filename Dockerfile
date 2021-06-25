FROM node:10.24-alpine as builder

RUN npm i npm@latest -g

WORKDIR /app/web

COPY package.json .
COPY package-lock.json .
RUN npm install --quiet --no-progress && npm cache clean --force
COPY . .

RUN npm run build

# ------------------------------------------------------
# Production Build
# ------------------------------------------------------
FROM nginx:1.16.0-alpine
COPY --from=builder /app/web/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx-prod.conf /etc/nginx/conf.d/app.conf
COPY nginx/load-balancer.conf /etc/nginx/conf.d/load-balancer.conf
COPY nginx/load-balancer-write.conf /etc/nginx/conf.d/load-balancer-write.conf
COPY nginx/load-balancer-read.conf /etc/nginx/conf.d/load-balancer-read.conf
COPY nginx/appointment-scheduler.conf /etc/nginx/conf.d/appointment-scheduler.conf
COPY nginx/live /usr/share/nginx/live
EXPOSE 443
EXPOSE 8080
EXPOSE 8000
EXPOSE 9000
EXPOSE 8985
CMD ["nginx", "-g", "daemon off;"]

FROM node:22-alpine AS build
WORKDIR /app

ARG VITE_API_URL=http://localhost:5000/api/v1
ARG VITE_SITE_URL=http://localhost:5173
ENV VITE_API_URL=$VITE_API_URL
ENV VITE_SITE_URL=$VITE_SITE_URL

# Sibling layout under /app (build context = meta root)
COPY shared/package.json shared/tsconfig.json ./shared/
COPY shared/src ./shared/src
COPY client/package.json client/.npmrc ./client/

WORKDIR /app/shared
RUN npm install && npm run build

WORKDIR /app/client
RUN npm install

COPY client ./client
RUN npm run build

FROM nginx:1.27-alpine AS runner
COPY client/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/client/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

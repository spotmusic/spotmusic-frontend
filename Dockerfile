## Compilando aplicação
#=========================
FROM node:current-alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json /app/package.json
RUN npm install
COPY ./src /app/src
COPY ./public /app/public
RUN REACT_APP_BACKEND_URL=${REACT_APP_BACKEND_URL} \
    npm run build

## Imagem de Produção
#=======================
FROM nginx:stable-alpine
ENV PORT=80
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/templates/default.template
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
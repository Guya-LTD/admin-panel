# build environment
FROM node:13.12.0-alpine as build

ENV WORK_DIR /usr/src/app
WORKDIR ${WORK_DIR}

ENV PATH ${WORK_DIR}/node_modules/.bin:$PATH

COPY package.json ./

COPY yarn.lock ./

RUN yarn install

COPY . ./

RUN yarn run build

#
# production environment
#
FROM guyaltd/nginx:1.0.0

ENV WORK_DIR /usr/src/app

COPY --from=build ${WORK_DIR}/build /usr/share/nginx/html

#ENV PORT 80

#EXPOSE ${PORT}

#CMD ["nginx", "-g", "daemon off;"]
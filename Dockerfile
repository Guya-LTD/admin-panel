########################################################
# Base                                                 #
########################################################
FROM node:13.12.0-alpine as base

ENV WORK_DIR /usr/src/app
WORKDIR ${WORK_DIR}

ENV PATH ${WORK_DIR}/node_modules/.bin:$PATH

COPY package.json ./

RUN npm install

COPY . ./

########################################################
# Development build                                    #
########################################################
FROM base AS development

CMD CI=true npm start

EXPOSE 3000

########################################################
# Production build                                     #
########################################################
FROM base AS build

RUN npm run build

########################################################
# Production environment                               #
########################################################
FROM guyaltd/nginx:v1.0.0 AS production

ENV WORK_DIR /usr/src/app

COPY --from=build ${WORK_DIR}/build /usr/share/nginx/html

#ENV PORT 80

#EXPOSE ${PORT}

#CMD ["nginx", "-g", "daemon off;"]
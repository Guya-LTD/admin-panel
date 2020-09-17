########################################################
# Base                                                 #
########################################################
FROM node:13.12.0-alpine as base

ENV WORK_DIR /usr/src/app
WORKDIR ${WORK_DIR}

#ENV PATH ${WORK_DIR}/node_modules/.bin:$PATH

COPY . ./

RUN yarn install

########################################################
# Development build                                    #
########################################################
FROM base AS development

ENV WORK_DIR /usr/src/app
WORKDIR ${WORK_DIR}

CMD CI=true yarn start 

EXPOSE 3000

########################################################
# Production build                                     #
########################################################
FROM base AS build

RUN yarn run build

########################################################
# Production environment                               #
########################################################
FROM guyaltd/nginx:v1.0.0 AS production

ENV WORK_DIR /usr/src/app

COPY --from=build ${WORK_DIR}/build /usr/share/nginx/html

#ENV PORT 80

#EXPOSE ${PORT}

#CMD ["nginx", "-g", "daemon off;"]
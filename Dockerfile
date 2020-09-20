########################################################
# Development build                                    #
########################################################
FROM guyaltd/admin-panel:build  AS development

ENV WORK_DIR /usr/src/app
WORKDIR ${WORK_DIR}

COPY . ./

CMD CI=true yarn start 

EXPOSE 3000

########################################################
# Production environment                               #
########################################################
FROM guyaltd/nginx:v1.0.0 AS production

ENV WORK_DIR /usr/src/app
WORKDIR ${WORK_DIR}

COPY . ./

RUN yarn install

RUN yarn run build

COPY ${WORK_DIR}/build /usr/share/nginx/html

#ENV PORT 80

#EXPOSE ${PORT}

#CMD ["nginx", "-g", "daemon off;"]

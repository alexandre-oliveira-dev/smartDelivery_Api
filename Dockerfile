FROM node:18-alpine

WORKDIR src/index
COPY  package.json yarn.lock ./

RUN  yarn generate
RUN  yarn

COPY  . .

EXPOSE 4000

CMD [ "yarn", "dev",'prisma generate' ]
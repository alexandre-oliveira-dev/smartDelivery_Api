#!/bin/bash
yarn

# Gera o Prisma Client
npx prisma generate

# Inicia a aplicação
yarn start
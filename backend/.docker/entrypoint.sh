#!/bin/bash

if [ ! -f ".env" ]; then
  cp .env.example .env
fi

echo "Installing dependencies..."
yarn

echo "Migrating..."
npx prisma migrate dev --name init

echo "Generating Prisma Client..."
npx prisma generate

echo "Running the development server"
yarn start:dev
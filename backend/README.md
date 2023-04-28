# BACKEND

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="100" alt="Nest Logo" /></a>
</p>

## Installation

```bash
yarn
```

## Env variables

<details>

### The `.env.example` has some variables to it

  ```bash
  POSTGRES_USER=
  POSTGRES_PASSWORD=
  POSTGRES_DB=
  POSTGRES_HOST=mmchat_db
  POSTGRES_PORT=5432
  PORT=4000
  DATABASE_URL="postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSGRES_DB}"
  ```

### First, do

  ```
  cp .env.example .env
  ```

### Then, fill all the fields related to the database and you ready to go

</details>

<br />

## Running the app

```bash
# container with watch mode
docker compose up -d
```

This command will create a postgres and a nestjs (node) container, with the database all setup to you!

The development server will be running at <http://localhost:4000/>

## Util commands

If you modify the schema.prisma, you will need to run `prisma migrate dev` so the changes make effect, so, this repository have some utils scripts run inside docker:

```bash
# migrate the last changes to schema.prisma
yarn migrate

# generate the prisma client with the changes that you done
yarn generate

# running seeds
yarn seeds
```

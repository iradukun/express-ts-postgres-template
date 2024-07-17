<h1 align="center">Docker Express Postgres Boilerplate</h1>


<p align="center">
  <b>A really simple boilerplate to build a REST API with authentication written in TypeScript and using Docker, Express, TypeORM
</p>

<br />

---

## Overview

The main goal of this boilerplate is to setup an Express REST API and add common features like Docker containerization, database connection, error handling, etc.

Some basic routes for authentication and user creation are already implemented. They can be used to quickly start your project. More info about what is already implemented [here](#existing-routes).
---

## Features

- **Docker containerization** to easily run your code anywhere and don't have to install tools like PostgreSQL on your computer.
- **Authentication** with [Passport](https://www.passportjs.org/).
- **Simplified Database Query** managed by [TypeORM](https://github.com/typeorm/typeorm).
- **Simple but clear Structure** with different layers like routes, controllers, entities, utils, middlewares, config, etc.
- **Object-oriented database model** with [TypeORM](https://github.com/typeorm/typeorm) entities.
- **Routes protection** with custom middlewares.
- **Exception Handling** using [http-errors](https://github.com/jshttp/http-errors).
- **Basic Security Features** with [Helmet](https://helmetjs.github.io/) and [cors](https://github.com/expressjs/cors).
- **Configurated Code Linter** with [ESLint](https://eslint.org/) and common rules.
- **Helpful logger** with [morgan](https://github.com/expressjs/morgan).
- **Migration generation** based on entity changes thanks to [TypeORM](https://github.com/typeorm/typeorm).
---

## Table of Contents

- [Getting Started](#getting-started)
- [Scripts](#scripts)
- [API Routes](#api-routes)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Authentication](#authentication)
- [Migrations](#migrations)
- [Subscribers](#subscribers)
- [E2E Tests](#e2e-tests)
- [Logging](#logging)
- [Existing routes](#existing-routes)
- [Common Errors](#common-errors)
- [Clean Github Templates and Workflows](#clean-github-templates-and-workflows)
- [Upcoming Features](#upcoming-features)
- [Further Documentations](#further-documentations)
- [Contributing](#contributing)
- [License](#license)

---

## Getting Started

### Step 1: Set up the Development Environment

You need to set up your development environment before you can do anything.

#### Install [Node.js and NPM](https://nodejs.org/en/download/)

- on OSX use [homebrew](http://brew.sh) `brew install node`
- on Windows use [chocolatey](https://chocolatey.org/) `choco install nodejs`

#### Install pnpm globally

```bash
npm install --global pnpm
```

#### Install [Docker Desktop](https://www.docker.com/products/docker-desktop/).

- Install Docker Desktop
- Run Docker Desktop

### Step 2: Clone the project

```bash
git clone https://github.com/iradukun/express-ts-postress-template
cd express-ts-postress-template
rm -rf .git # Windows: rd /s /q .git
pnpm install
```

`rm -rf .git` (or `rd /s /q .git` on Windows) deletes the git info of the branch like history.

### Step 3: Copy .env.example file

- on OSX run `cp .env.example .env`
- on Windows run `copy .env.example .env`

### Step 4: Run the server

```bash
pnpm docker:up
pnpm dev
```

> This starts a local server using `nodemon`, which will watch for any file changes and will restart the server according to these changes.
> The server will be running on `http://0.0.0.0:8000` (or `http://localhost:8000`).

### Step 5: Test the server

To test the server, you can query `http://localhost:8000/api/health` using [Postman](https://www.postman.com/) or just copy it in the address bar in your browser.
If the server is running, you should receive `Server is up!` as response.

### Step 6: Create the user database table

To create the `user` database table, you must run the migration.
Run `pnpm migration:run` to run the migration and create the table.

---

## Scripts

⚠️ Except Docker scripts, all the scripts must be executed in the `api` container shell.


### • Docker

- Run `pnpm docker:up` to start the containers defined in `docker-compose.yml`. It automatically opens a shell in the `api` container. In this shell, you can run other scrips like `pnpm dev`.
- Run `docker:down` to stop the running containers.
- Run `docker:shell` to open a shell in `api` container.
- Run `docker:build` to build an image of your API.

### • Install

- Install all dependencies with `pnpm install`.

### • Running in dev mode

- Run `pnpm dev` to start [nodemon](https://www.npmjs.com/package/nodemon) with ts-node, to serve the app.
- By default, the server will be running on `http://0.0.0.0:8000` (or `http://localhost:8000`).

### • Build

- Run `pnpm build` to build the project. The compiled files will be placed in `build/`.
- Run `pnpm start` to run compiled project.
- Run `pnpm type-check` to run type checking.

### • Migrations
- Run `pnpm migration:run` to run non-executed migrations.
- Run `pnpm migration:generate MigrationName` to generate a migration based on entities changes.
- Run `pnpm migration:create MigrationName` to create a empty migration.
- Run `pnpm migration:revert` to revert the last migration. If you want to revert multiple migrations, you can run this command several times.

### • Linting
- Run code quality analysis using `pnpm lint`. This runs ESLint and displays warning and errors.
- You can also use `pnpm lint:fix` to run ESLint and fix fixable warning and errors.


---

## API Routes

The route prefix is `/api` by default, but you can change this in the .env file.

| Route                       | Method | Description |
| --------------------------- | ------ | ----------- |
| **/api/health**             | GET    | Show `Server is up!` |
| **/api/users**              | POST   | Create a user |

---

## Project Structure

| Name                                        | Description |
| ------------------------------------------- | ----------- |
| **@types/**                                 | Global types definitions |
| **build/**                                  | Compiled source files will be placed here |
| **src/**                                    | Source files |
| **src/config/**                             | Configuration files |
| **src/controllers/**                        | REST API Controllers |
| **src/controllers/[feature]/index.ts**      | Functions for feature routes |
| **src/entities/**                           | TypeORM entities |
| **src/middlewares/**                        | Middlewares |
| **src/migrations/**                         | Migrations files |
| **src/routes/**                             | REST API Routes |
| **src/routes/[feature].ts**                 | Feature routes |
| **src/types/**                              | Zod & Typescript types |
| **src/utils/**                              | Utils functions |
| **src/data-source.ts**                      | TypeORM data source |
| **src/index.ts**                            | REST API entry point |

---

## Environment Variables

| Name                | Description | Optional | Default value |
| ------------------- | ----------- | -------- | ------------- |
| NODE_ENV            |  Used to state whether an environment is a production, development, etc. | ✔️ |
| HOST                | Server host | ✔️ | 0.0.0.0 |
| PORT                | Server host port | ❌ |
| DB_USER             | Database username | ❌ |
| DB_HOST             | Database host | ❌ |
| DB_NAME             | Database name | ❌ |
| DB_PASSWORD         | Database password | ❌ |
| DB_PORT             | Database host port | ❌ |
| DB_HOST_PORT        | Database mapped port. On the machine that use Docker, the database will be accessible on this port | ❌ |
| CORS_ORIGIN_ALLOWED | List of CORS allowed origins | ✔️ |
| API_ROUTES_PREFIX   | The API routes prefix. Is set to `/api`, all the routes are accessible by querying `/api/...`   | ✔️ |

---

## Migrations

Thanks to TypeORM, you can easily manage your migrations. The executed migrations are stored in a table which allows TypeORM to know which migrations must be executed but also to revert migrations if you need.

⚠️ The migrations scripts must be executed in the `api` container shell.

### Create a migration

To create a migration, run `pnpm migration:create MigrationName`. It will create an empty migration in `src/migrations`. The migration file have two functions : `up` and `down`. `up` is executed when you run the migration. `down` is executed when you revert the migration.

### Generate a migration

To generate a migration based on entities' changes, run `pnpm migration:generate MigrationName`, it will create a migration in `src/migrations`. The migration is automatically generated based on your entities compared to your actual database.

For example, you can try by adding a property `firstName` in the `User` entity:
```typescript
@Column({ nullable: false, length: 20 })
firstName!: string;
```
Then, run `pnpm migration:generate AddFirstNameInUser`, it will automatically generate a migration to create the new column.

### Run migrations

To run the migrations that have not been executed yet, run `pnpm migration:run`.

### Revert a migration

You can revert the last executed migration by running `pnpm migration:revert`. If you want to revert multiple migrations, you can run this command several times.

---


## Logging

To log HTTP requests, we use the express middleware [morgan](https://github.com/expressjs/morgan).
You can easily configure it by passing a [predifined format](https://github.com/expressjs/morgan#predefined-formats) as parameter in `src/config/express.ts`.

Example:
```typescript
app.use(morgan('short'));
```

---

## Common Errors

If you encounter an error when running `pnpm docker:up`, make sure Docker Desktop is running.

If you encounter an error when running a script, make sure you ran the script in the `api` container shell.

---

## License

[MIT](/LICENSE)

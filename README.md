# NestJS Scrapper

## Requirements

Before anything, you need the following softwares installed on your machine:

- [Node](https://nodejs.org/en/download/current/) >= 8.11
- [Docker](https://docs.docker.com/engine/installation/)
- [Docker Compose](https://docs.docker.com/compose/install/)

Install the dependencies:

```bash
docker-compose run --rm nestjs-scrapper npm install
```

## Start

```bash
docker-compose up
```

## Access to application

You can now access your application using below url:  
[https://localhost:3000](https://localhost:3000)

## Running the app as a standalone

```bash
# development
$ npm run start:dev

# production mode
$ npm run start
```

## Test

```bash
# unit tests
$ npm run test

# unit tests in watch mode
$ npm run test:watch

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov

# test ci
$ npm run test:ci
```

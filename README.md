# Nodejs training

This is a project for training nodejs. It uses [Docker](https://www.docker.com/) to quickly build and run the project.
For database, it uses [PostgreSQL](https://www.postgresql.org/) and [TypeORM](https://typeorm.io/) as ORM, and to expose an API, it uses [Express](https://expressjs.com/).

## Technologies

- [Docker](https://www.docker.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [TypeORM](https://typeorm.io/)
- [Express](https://expressjs.com/)
- [Git](https://git-scm.com/)
- [Morgan](https://github.com/expressjs/morgan)
- [Awilix](https://github.com/jeffijoe/awilix)

## Installation

You need to install docker on your machine before the installation.

### Run a local db with docker

```
npm run local-db
```

### Run dev environment

```
npm run dev
```

### Build image

```
docker build .
```

### Start image

```
docker run nodejstraining
```

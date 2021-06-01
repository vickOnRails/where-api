# Where API

WhereAPI is a self-hosted, open-source, RESTful service to help solve location-related functionality for African applications.

> WhereAPI is an experiment and I'm currently talking to users and building additional features on demand. It's not ready for production, please take a look at the [Trello board](https://trello.com/b/93xAfnnT/where-api-tracker) to see progress. However, you can [create an account](https://www.whereapi.xyz/auth/sign-up) to experiment with the API as a Beta tester.

## Project Purpose

While working at a startup in 2017, there was one problem that really bothered us - Location. We spent weeks trying to collate and index a database of 32 states with their Local govt areas. Some had 12, some had 17, one had 44.

At my second job, we had to seed, maintain and constantly update a database of the same exact information - Countries, States and LGAs. This took a lot of time from actually building software.

This is why I’m building Where API - **To help solve location-related problems for African developers.**

## Features

- Highly customizable, Open-source, self-hosted
- Database layer with Postgres and Prisma
- GraphQL Support (Coming soon)

## Documentation

Check out project documentation [here](https://tutorial.whereapi.xyz/)(WIP). There's also a tutorial project to show how the API works here.

### Getting Started

1. Clone the project from this repository

```bash
git clone https://github.com/vickOnRails/where-api.git
```

2. Install dependencies

```bash
$ cd where-api
$ npm install

# OR if you use yarn
$ cd where
$ yarn
```

3. Create a .env file with the following parameters set

```bash
# desired port for the app to run on
PORT=5500

# BaseURL for your API
BASEAPI=http://localhost:5000/api

# Database URL. WhereAPI only works with a Postgres database
DATABASE_URL="Postgres://...."
```

4. Generate the Prisma client

```bash
npx prisma generate
```

5. Seed your database by running the `seed-db` script.

```bash
npm run seed-db

# or

yarn seed-db
```

> Make sure your PostgreSQL database is already created. It'll throw an error if it isn't.

6. Deploy to any cloud provider

## Todo

- [ ] Project Documentation & Setup
- [x] Move database from Mongo to Postgres
- [ ] Move hosting of demo version to AWS
- [ ] Implement GraphQL Support
- [ ] Data entry for Kenya, South Africa & Ethopia
- [ ] Launch V1

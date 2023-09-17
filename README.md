# Product inventory app

Goal of the assignment is to create a minimalistic product inventory system.
This repository contains a stub of the application with the same tech stack
that our real application is built with:

- [Docker](https://www.docker.com/)
- [Postgres SQL database](https://www.postgresql.org/)
- [Hasura GraphQL server](https://hasura.io/)
- [Typescript](https://www.typescriptlang.org/)
- [React](https://react.dev/)
- [Apollo GraphQL client](https://www.apollographql.com/docs/react/)
- [Ant Design UI library](https://ant.design/)

## Tasks

Please complete all of the following:

1. List available products, their stock and prices
1. Calculate total value of all products in the inventory
1. Create a form to add new product to inventory

## Run the application

```sh
# install dependencies
npm i

# start frontend server
npm start

# start postgres & hasura
docker compose up
```

Then open http://localhost:3000/ in your browser.

Hasura serves a grapql endpoint with schema auto generated from Postgres schema. It is available at http://localhost:8080/v1/graphql. Frontend should interact with the database only through this endpoint.

Hasura console is available at http://localhost:8080/console.

To add migrations for new database tables, you would have to run Hasura console locally using [Hasura CLI](https://hasura.io/docs/latest/hasura-cli/overview/).

## Added extra features

1. Added a search bar to search for products by name.
1. Added a debounce function to the search bar to prevent too many requests being sent to the server.
1. Hosted the application on Vercel. It can be accessed at https://invo-erp-assessment.vercel.app/
1. Hosted the postgres database on Render postgres server.
1. Added the ability to sort the products by name, price and stock.
1. Added appropriate tests for the components and the hooks.

## Run the tests

```sh
npm test
```

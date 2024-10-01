# Carplates App - Carplate numbers CRUD App.

<a alt="Nx logo" href="https://nx.dev" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="45"></a>

✨ **This workspace has been generated by [Nx, a Smart, fast and extensible build system.](https://nx.dev)** ✨

## Features

- REST API endpoints for carplate Creation, Updating, Reading, and Deleting.

## Understand this workspace

Run `nx graph` to see a diagram of the dependencies of the projects.

## Further help

Visit the [Nx Documentation](https://nx.dev) to learn more.

## Development server

### Angular Setup

For the local environment run `yarn run angular-app:dev` for a dev angular app. Navigate to [http://localhost:4200/](http://localhost:4200/). The app will automatically reload if you change any of the source files.

### Express App

For the local environment run `yarn run backend-api:dev` for a dev express app. Navigate to [http://localhost:8080](http://localhost:8080/). The app will automatically reload if you change any of the source files. For the database [install](https://dev.mysql.com/downloads/mysql/) MySQL server.

### Docker

Add [sentry](https://sentry.io/) DSN to .env `SENTRY_EXPRESS_DSN` variable if available.

For the docker environment run `docker compose up --build`. Add -d for detached mode. Use [Docker desktop](https://www.docker.com/products/docker-desktop/) for easier Docker management.

### Swagger

To access navigate to [http://localhost:8080/docs/](http://localhost:8080/docs/)

### Library Unit testing

Run `npx nx test <LIBRARY-NAME>`. Library name can be found in jest.config.ts of each library.

```bash
npx nx test frontend-angular-carplate-carplate-data-access
```

## Developemnt Experience

### Husky git hooks with Commitlint conventions

[Husky](https://typicode.github.io/husky/) for git hooks to standartize good practices and code documenting.

Read more on [Commitlint conventions](https://www.npmjs.com/package/@commitlint/config-conventional) or [conventions configuration](https://commitlint.js.org). If any of scripts seem to fail without a reason, try adjusting encoding to UTF8.

There is a default commit convention enforcing one of [`build`, `chore`, `ci`, `docs`, `feat`, `fix`, `perf`, `refactor`, `revert`, `style`, `test`] types, for ex: `type: message`

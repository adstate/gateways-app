## Description

App for store information about gateways and their associated devices.

There is backend on NestJs in folder backend.
Frontend is written with react and located in folder frontend.
MongoDb is used for store information about gateways and devices.

## Running the app

Docker-compose is used to organize all services together.
Migrations will be runned automaticaly before running backend.

```bash
$ docker-compose up -d
```

After running containers frontend will be available on http://localhost:3000

## Running without docker-compose

For running in development mode need firstly set MONGODB_URL variable in .env file for backend.

Then run for backend:

```bash
$ cd ./backend
$ yarn install
$ yarn start
```

Then run for frontend:

```bash
$ cd ./frontend
$ yarn start
```

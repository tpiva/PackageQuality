# LibQuality
Simple tool to compare open source libs in Github.

At moment only 3 open sources can be compare: [React](https://github.com/facebook/react), [Angular](https://github.com/angular/angular) and [Vue](https://github.com/vuejs/vue)

## Architecture

## Database

## How use
This project needs a database Postgres, so that It's neccessary to have it install and running in your machine. **If you don't have**, please follow steps in next session.

### Instancing database and initializing it

First of all install all dependecies of project by command:
```
npm run install
```

1. At the main folder of LibQuality project run command:
```
docker-compose up
```

2. After container instanced, change name of file **.env-development** to **.env** - This files has the enviroment variables to connect into dabase to create tables and insert initial data.

3. Migrate database and seed it by command:
```
// create tables
npm run db:create

// insert initial data
npm run db:seed
```

### Run server

After database is instanced to run server, it's just necessary to run command - **.env** should exists:
```
npm run start
```
### Run tests

1. Change file **.env** to **.env-development** and change **.env-test** to **.env** - This **.env-test** has system enviroments for test

2. Run step __3__ in section [Instancing database and initializing it](README.md) - This will create tables and seed it in test enviroment's

3. Run command:
```
npm run test
```

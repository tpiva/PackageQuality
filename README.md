# LibQuality
Simple tool to compare open source libs in Github.

At moment only 3 open sources can be compare: [React](https://github.com/facebook/react), [Angular](https://github.com/angular/angular) and [Vue](https://github.com/vuejs/vue)

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

## Routes Documentation
All routes are document on swagger
Link: http://localhost:3000/v1/swagger

## Libs

### Production:
- [koa](https://koajs.com/): Make the code more easible to read and implement.
- [dotenv](https://www.npmjs.com/package/dotenv): Load enviroment into code
- [lodash](https://lodash.com/docs/4.17.15): It has a huge number of helper's functions that make the code more declarative.
- [log4js](https://www.npmjs.com/package/log4js): Log everthing make on code, more easily to see what happens in case any bug
- [node-schedule](https://www.npmjs.com/package/node-schedule): Widely used scheduler to run at an period of day to dowload every data from github.
- [sequelize](https://sequelize.org/): Easily ORM to transpile database into models and make easily to migrate database during any change
- [app-module-path](https://www.npmjs.com/package/app-module-path): Make easily to import module without **require** or **import** be big.

### Development
- [eslint](https://eslint.org/): Static analyzer of code, it can found error into code making the code more robust
- [babel](https://www.npmjs.com/package/@babel/node): Transpiler to ES6 features.
- [chai](https://www.chaijs.com/): Help to make assertions for test
- [mocha](https://mochajs.org/): Framework used to make some tests in javascript.
- [sinon](https://sinonjs.org/): Lib used to make more easily mock and spy some functions, classes and other stuffs in javascript
- [supertest](https://www.npmjs.com/package/supertest): Use to make easily HTTP test

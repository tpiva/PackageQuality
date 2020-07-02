import SwaggerParser from 'swagger-parser';
import routes from './routes';
import yamljs from 'yamljs';

// load YAML swagger file
const document = yamljs.load(`${__dirname}/swagger/swagger.yaml`);

// validate document
SwaggerParser.validate(document, (err) => {
  if (err) {
    console.log(err);
    throw Error('./swagger.yml does not conform to the Swagger 3.0 schema');
  }
});

export default {
  swaggerConfig: document,
  routes,
  basePath: `/${__dirname.split('/').slice(-1).pop()}`
};
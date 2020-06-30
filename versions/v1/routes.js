import { health, project } from './src/routes';

export default (version) => {
  version.use(health.routes(), health.allowedMethods());
  version.use(project.routes(), project.allowedMethods());
};
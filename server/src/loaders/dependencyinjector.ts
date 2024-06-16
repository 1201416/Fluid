import { Container } from 'typedi';

export default ({ mongoConnection, schemas, controllers, repos, services}: {
                    mongoConnection: any;
                    schemas: { name: string; schema: any }[],
                    controllers: {name: string; path: string }[],
                    repos: {name: string; path: string }[],
                    services: {name: string; path: string }[] }) => {
  try {
    schemas.forEach(m => {
      let schema = require(m.schema).default;
      Container.set(m.name, schema);
    });

    repos.forEach(m => {
      let repoClass = require(m.path).default;
      let repoInstance = Container.get(repoClass);
      Container.set(m.name, repoInstance);
    });

    services.forEach(m => {
      let serviceClass = require(m.path).default;
      let serviceInstance = Container.get(serviceClass)
      Container.set(m.name, serviceInstance);
      });

    controllers.forEach(m => {
      let controllerClass = require(m.path).default;
      let controllerInstance = Container.get(controllerClass);
      Container.set(m.name, controllerInstance);
    });

    return;
  } catch (e) {
    console.log('Error on dependency injection', e);
    throw e;
  }
};

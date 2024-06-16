import express from 'express';
import config from '../config';
import 'reflect-metadata';
import os from 'os';
async function startServer() {
  const app = express();

 await require('./loaders').default({ expressApp: app });

  app.listen(config.port, () => {
    const hostname = os.hostname();
    const protocol = 'http'; 
    const baseUrl = `${protocol}://${hostname}:${config.port}`;
    console.log(`
      --------------------------------------------
      Server listening on port: ${config.port}
      Base URL: ${baseUrl}
      --------------------------------------------
    `);
  }).on('error', err => {
    console.log(err);
    process.exit(1);
  });
}

startServer();

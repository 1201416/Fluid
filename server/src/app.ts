import express from 'express';
import config from '../config';
import Logger from './loaders/logger';
import 'reflect-metadata'; // We need this in order to use @Decorators
import os from 'os';
async function startServer() {
  const app = express();

  /**
   * A little hack here
   * Import/Export can only be used in 'top-level code'
   * Well, at least in node 10 without babel and at the time of writing
   * So we are using good old require.
   **/
 await require('./loaders').default({ expressApp: app });

  app.get('/', (req, res) => {
    res.send('Hello World!')
  })

  app.listen(config.port, () => {
    const hostname = os.hostname();
    const protocol = 'http'; // Assuming you have a way to determine if SSL is used
    const baseUrl = `${protocol}://${hostname}:${config.port}`;
    Logger.info(`
      ################################################
      🛡️  Server listening on port: ${config.port} 🛡️
      🛡️  Base URL: ${baseUrl} 🛡️
      ################################################
    `);
  }).on('error', err => {
    Logger.error(err);
    process.exit(1);
  });
//app.listen(config.port, () => {
//     console.log(`Server is running on http://localhost:${config.port}`);
//});
}

startServer();

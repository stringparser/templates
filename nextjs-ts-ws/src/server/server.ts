import { NODE_PORT, IS_DEVELOPMENT } from '../env';

import * as path from 'path';
import * as next from 'next';
import * as express from 'express';
import * as bodyParser from 'body-parser';

import router from './router';
import apollo from './apollo';
import { createServer } from 'http';

const app = next({
  dev: IS_DEVELOPMENT,
  dir: path.join(process.cwd(), 'src', 'client'),
});

app
  .prepare()
  .then(() => {
    const server = express();
    const routes = router(app);
    const httpServer = createServer(server);

    apollo(server, httpServer);

    server.use(bodyParser.json());
    server.use(routes);

    httpServer.listen(NODE_PORT, () => {
      console.log(`> server started at http://localhost:${NODE_PORT}`);
    });
  })
;

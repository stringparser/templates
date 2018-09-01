import { Server } from 'next';
import * as express from 'express';

export default (app: Server) => {
  const router = express.Router();
  const handle = app.getRequestHandler();

  // client/index.tsx
  router.get('/', async (req, res) => {
    await app.render(req, res, '/', req.query);
  });

  // 404, etc.
  router.get('*', async (req, res) => {
    await handle(req, res);
  });

  return router;
};

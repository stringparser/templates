import * as path from 'path';
import * as Koa from 'koa';
import * as next from 'next';
import * as Router from 'koa-router';
import * as bodyParser from 'koa-bodyparser';

import { NODE_PORT, IS_DEVELOPMENT } from './env';

const app = next({
  dev: IS_DEVELOPMENT,
  dir: path.join(__dirname, 'client'),
});

app
  .prepare()
  .then(() => {
    const server = new Koa();
    const router = new Router();
    const handle = app.getRequestHandler();

    router.get('/', async (ctx) => {
      await app.render(ctx.req, ctx.res, '/', ctx.query);
      ctx.respond = false;
    });

    router.get('*', async ctx => {
      await handle(ctx.req, ctx.res);
      ctx.respond = false;
    });

    server.use(router.routes());
    server.use(bodyParser());

    server.listen(NODE_PORT, () => {
      console.log(`> server started at http://localhost:${NODE_PORT}`);
    });
  })
;

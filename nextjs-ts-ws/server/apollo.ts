import { Express } from 'express';
import { PubSub, ApolloServer } from 'apollo-server-express';

import schema from './graphql/schema';
import { Server } from 'http';
import { IS_DEVELOPMENT } from '../config/env';

export const pubsub = new PubSub();

const apolloServer = new ApolloServer({
  schema,
  tracing: IS_DEVELOPMENT,
});

export default (app: Express, httpServer: Server) => {
  apolloServer.applyMiddleware({ app });
  apolloServer.installSubscriptionHandlers(httpServer);
};

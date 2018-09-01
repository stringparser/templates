import { pubsub } from '../apollo';
import {
  GraphQLInt,
  GraphQLSchema,
  GraphQLString,
  GraphQLObjectType,
} from 'graphql';

const query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    counter: {
      type: GraphQLInt,
    }
  }
});

const subscription = new GraphQLObjectType({
  name: 'Subscription',
  fields: {
    ping: {
      type: GraphQLString,
      resolve: (payload) => console.log('ping payload', payload) || payload,
      subscribe: () => pubsub.asyncIterator('PING'),
    },
  }
});

export default new GraphQLSchema({
  query,
  subscription,
});

const output = { counter: -1 };

setInterval(() => {
  ++output.counter;
  pubsub.publish('PING', ++output.counter);
}, 1000);

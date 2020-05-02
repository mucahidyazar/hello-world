import { ApolloServer } from 'apollo-server-micro';
import connectDb from '../../lib/mongoose';
import { mergeResolvers, mergeTypeDefs } from 'graphql-toolkit';
import { Queries } from '../../api/habits/Queries';
import { Mutations } from '../../api/habits/Mutations';
import typeDefsOfHabits from '../../api/habits/typeDefs.graphql';

const typeDefs = mergeTypeDefs([
  typeDefsOfHabits
]);

const resolvers = mergeResolvers([
  Queries,
  Mutations
]);

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers
});

export const config = {
  api: {
    bodyParser: false
  }
}

const server = apolloServer.createHandler({ path: "/api/graphql" })
export default connectDb(server);
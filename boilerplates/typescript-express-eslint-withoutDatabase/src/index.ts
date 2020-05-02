import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { resolvers, typeDefs } from './graphql';
const PORT = process.env.PORT || 9000;

const startServer = () => {

  const app = express();
  app.use(express.json());
  const server = new ApolloServer({
    // typeDefs: ``,
    // resolvers: {
  
    // }
    resolvers,
    typeDefs
  });
  server.applyMiddleware({app, path: '/api'});
  app.listen(PORT, () => {
    console.log(`[app]: http:localhost:${PORT}`);
    console.log(`[graphQL API]: http:localhost:${PORT}/api`);
  });
  
}

startServer();
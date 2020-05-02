require('dotenv').config();
import express, { Application } from 'express';
import { ApolloServer } from 'apollo-server-express';
import { resolvers, typeDefs } from './graphql';
import { connectDatabase } from './database';
const PORT = process.env.PORT;

const startServer = async (app: Application) => {

  const db = await connectDatabase();
  console.log('Connected database');

  //const app = express(); => Bunun yerine App'i Typescripti kullanarak yukaridaki sekilde aliyoruz.
  app.use(express.json());
  const server = new ApolloServer({
    resolvers,
    typeDefs,
    context: () => ({db})
  });
  server.applyMiddleware({app, path: '/api'});
  app.listen(PORT, () => {
    console.log(`[app]: http:localhost:${PORT}`);
    console.log(`[graphQL API]: http:localhost:${PORT}/api`);
  });
  
}

startServer(express());
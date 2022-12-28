import express, { Express, Request, Response } from 'express';
import 'reflect-metadata';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

dotenv.config();

// The GraphQL schema
const typeDefs = `#graphql
  type Query {
    hello: String
  }
`;

// A map of functions which return data for the schema.
const resolvers = {
  Query: {
    hello: () => 'world',
  },
};

const app: Express = express();
const httpServer = http.createServer(app);
const port = process.env.PORT || 3000;

// Set up Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});
await server.start();

app.use('/graphql', cors(), bodyParser.json(), expressMiddleware(server));

app.get('/', (_: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

await new Promise<void>((resolve) => httpServer.listen({ port }, resolve));
console.log(`🚀 Server ready at http://localhost:${port}`);

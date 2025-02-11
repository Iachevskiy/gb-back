import { db } from "./db.ts";

import { buildSchema } from 'drizzle-graphql';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

const { schema } = buildSchema(db);
const server = new ApolloServer({
    schema,
    formatError: (err) => ({
        message: err.message,
        path: err.path,
    })
});
const { url } = await startStandaloneServer(server);

console.log(`🚀 Server ready at ${url}`);

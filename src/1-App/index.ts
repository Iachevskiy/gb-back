import { applyMiddleware } from "graphql-middleware";
import AppSchema from "./schema.ts"
import { permissions } from "Middlewares/Permission"
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";


const schema = applyMiddleware(AppSchema, permissions)


const server = new ApolloServer({
    schema,
    // formatError: (err) => ({
    //     message: err.message,
    //     path: err.path,
    // }),
});

const { url } = await startStandaloneServer(server, {
    context: async ({ req }) => {
        // @ts-ignore
        const { query = "", operationName = "" } = req.body;

        // console.log('data', typeof req, query, operationName);
        // console.log('data context');
        return {};
    },
});

console.log(`🚀 Server ready at ${url}`);

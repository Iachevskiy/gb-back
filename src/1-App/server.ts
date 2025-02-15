import { applyMiddleware } from "graphql-middleware";
import { ApolloServer } from "@apollo/server";

import AppSchema from "@/1-App/schema.ts";
import { permissions } from "Middlewares/Permission";


const schema = applyMiddleware(AppSchema, permissions)


export default new ApolloServer({
    schema,
    // formatError: (err) => ({
    //     message: err.message,
    //     path: err.path,
    // }),
});

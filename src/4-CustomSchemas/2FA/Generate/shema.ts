import {makeExecutableSchema} from "@graphql-tools/schema";
import typeDefs from './typeDefs.ts';
import mutation from "./mutation.ts";

export default makeExecutableSchema({ typeDefs, resolvers: {
        Mutation: {
            generate2FA: mutation
        }
    } })

import { db } from "./db.ts";

import { buildSchema } from 'drizzle-graphql';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { applyMiddleware } from "graphql-middleware";
import { rule, shield, type IRule } from "graphql-shield";

const drizzleGraphql = buildSchema(db);

enum Permission {
    READ_USERS = "READ_USERS",
    EDIT_USERS = "EDIT_USERS",
    DELETE_USERS = "DELETE_USERS",
    VIEW_ORDERS = "VIEW_ORDERS",
    EDIT_ORDERS = "EDIT_ORDERS",
    // Добавь другие права, если нужно
}

const prepareRule = (permission: Permission, forOwner: boolean) => {
    return rule()(async (parent, args, ctx, info) => {
        // const currentUserRoleId = ctx.user.ruleId as string;
        console.log('parent', ctx);

        const can = ctx.user?.permissions?.includes(permission);

        if(forOwner) {
            const currentUserId = ctx.user.id as string;
            return currentUserId === args.id && can
        }
        return can
    })
}

const queryMapPermissions: Record<keyof typeof drizzleGraphql.entities.queries , IRule> = {
    // testModelSingle: prepareRule(Permission.READ_USERS, false),
    // testModel: prepareRule(Permission.DELETE_USERS, false)
};

const mutationMapPermissions: Record<keyof typeof drizzleGraphql.entities.mutations , IRule> = {
    // insertIntoTestModel: prepareRule(Permission.EDIT_USERS, true),
    // deleteFromTestModel: prepareRule(Permission.DELETE_USERS, true),
    // updateTestModel: prepareRule(Permission.EDIT_USERS, true),
    // insertIntoTestModelSingle: prepareRule(Permission.EDIT_USERS, true)
};

const permissions = shield({
    Query: queryMapPermissions,
    Mutation: mutationMapPermissions,
});

const schema = applyMiddleware(drizzleGraphql.schema, permissions)

const server = new ApolloServer({
    schema,
    formatError: (err) => ({
        message: err.message,
        path: err.path,
    }),
});

const { url } = await startStandaloneServer(server, {
    context: async ({ req }) => {
        // @ts-ignore
        const { query = "", operationName = "" } = req.body;

        // console.log('data', typeof req, query, operationName);
        console.log('data context');
        return {};
    },
});

console.log(`🚀 Server ready at ${url}`);

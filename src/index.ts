import { db } from "./db.ts";

import { buildSchema } from 'drizzle-graphql';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { applyMiddleware } from "graphql-middleware";
import { rule, shield, type IRule, deny } from "graphql-shield";
import speakeasy from "speakeasy";

import { makeExecutableSchema, mergeSchemas } from "@graphql-tools/schema";

const drizzleGraphql = buildSchema(db);

// 📌 2. Определяем GraphQL-схему для 2FA
const typeDefs = `
  type TwoFA {
    secret: String!
    qrCode: String!
    otpauthUrl: String!
  }

  type TwoFAResponse {
    success: Boolean!
  }

  type Mutation {
    generate2FA(userId: String!): TwoFA!
    verify2FA(userId: String!, token: String!): TwoFAResponse!
  }
`;


// 📌 4. Создаём резолверы для 2FA
const resolvers = {
    Mutation: {
        generate2FA: async (_: unknown, { userId }: {userId: string}) => {
            // if (!userId) throw new Error("userId обязателен");

            const secret = speakeasy.generateSecret({ length: 20 });
            // users2FA.set(userId, secret.base32);

            const otpauthUrl = secret.otpauth_url;
            // const qrCode = await QRCode.toDataURL(otpauthUrl);

            return { secret: secret.base32, qrCode: 'qrCode', otpauthUrl };
        },
        verify2FA: (_: unknown, { userId, token }: {userId: string, token: string}) => {
            // if (!userId || !token) throw new Error("userId и token обязательны");
            //
            const secret = "LZTUEVRMGNJTEMBIOY7XMKRELNGU6Q3M";
            // if (!secret) throw new Error("2FA для пользователя не настроена");
            //
            const verified = speakeasy.totp.verify({
                secret,
                encoding: "base32",
                token,
                window: 2,
            });

            return { success: verified };
        },
    },
};

// 📌 5. Объединяем схему drizzleGraphql и нашу 2FA-схему
const extendedSchema = mergeSchemas({
    schemas: [drizzleGraphql.schema, makeExecutableSchema({ typeDefs, resolvers })],
});

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

        const can = !ctx.user?.permissions?.includes(permission);

        if(forOwner) {
            const currentUserId = ctx.user.id as string;
            return currentUserId === args.id && can
        }
        console.log('prepareRule can', can);
        return can
    })
}

const queryMapPermissions: Record<keyof typeof drizzleGraphql.entities.queries , IRule> = {
    // permissionsToRoles: prepareRule(Permission.READ_USERS, false),
    permissionsToRoles: rule()(()=> true),
};

const mutationMapPermissions: Record<keyof typeof drizzleGraphql.entities.mutations , IRule> = {
    // insertIntoTestModel: prepareRule(Permission.EDIT_USERS, true),
    // deleteFromTestModel: prepareRule(Permission.DELETE_USERS, true),
    // updateTestModel: prepareRule(Permission.EDIT_USERS, true),
    // insertIntoTestModelSingle: prepareRule(Permission.EDIT_USERS, true)
};

const permissions = shield({
    Query: {
        "*": deny,
        ...queryMapPermissions
    },
    Mutation: mutationMapPermissions,
},
    {
        allowExternalErrors: true
    }
    );

const schema = applyMiddleware(extendedSchema, permissions)

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
        console.log('data context');
        return {};
    },
});

console.log(`🚀 Server ready at ${url}`);

import { deny, type IRule, rule, shield } from "graphql-shield";
import { drizzleGraphql } from "Drizzle/Schema/Config";

const queryMapPermissions: {[K in keyof typeof drizzleGraphql.entities.queries]?: IRule} = {
    // permissionsToRoles: prepareRule(Permission.READ_USERS, false),
    // permissionsToRoles: rule()(()=> true),
    // roleModel: rule()(()=> true),
};

const mutationMapPermissions: {[K in keyof typeof drizzleGraphql.entities.mutations]?: IRule} = {
    // insertIntoTestModel: prepareRule(Permission.EDIT_USERS, true),
    // deleteFromTestModel: prepareRule(Permission.DELETE_USERS, true),
    // updateTestModel: prepareRule(Permission.EDIT_USERS, true),
    // insertIntoTestModelSingle: prepareRule(Permission.EDIT_USERS, true)
};

export const permissions = shield({
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

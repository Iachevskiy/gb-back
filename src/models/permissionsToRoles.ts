import {boolean, pgTable, primaryKey, uuid} from "drizzle-orm/pg-core";
import permissions from './permissions.ts'
import roles from './roles.ts'
import {relations} from "drizzle-orm";

export const permissionsToRoles = pgTable(
    "role_permissions",
    {
        roleId: uuid("role_id")
            .notNull()
            .references(() => roles.id), // Убрали cascade
        permissionId: uuid("permission_id")
            .notNull()
            .references(() => permissions.id), // Убрали cascade
        enabled: boolean("enabled").default(true),
    },
    (t) => ({
        pk: primaryKey({ columns: [t.roleId, t.permissionId] }), // Уникальная пара (roleId, permissionId)
    })
);


export const permissionsToRolesRelations = relations(permissionsToRoles, ({ one }) => ({
    roles: one(roles, {
        fields: [permissionsToRoles.roleId],
        references: [roles.id],
    }),
    permissions: one(permissions, {
        fields: [permissionsToRoles.permissionId],
        references: [permissions.id],
    }),
}));

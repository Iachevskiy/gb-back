import {boolean, pgTable, primaryKey, uuid} from "drizzle-orm/pg-core";

import { RoleModel } from "Drizzle/Entities/Role"
import { PermissionModel } from "Drizzle/Entities/Permission"

export default pgTable(
    "role_permission",
    {
        roleId: uuid("role_id")
            .notNull()
            .references(() => RoleModel.id), // Убрали cascade
        permissionId: uuid("permission_id")
            .notNull()
            .references(() => PermissionModel.id), // Убрали cascade
        enabled: boolean("enabled").default(true),
    },
    (t) => ({
        pk: primaryKey({ columns: [t.roleId, t.permissionId] }), // Уникальная пара (roleId, permissionId)
    })
);



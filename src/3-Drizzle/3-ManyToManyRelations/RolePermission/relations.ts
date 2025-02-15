import {relations} from "drizzle-orm";
import model from "./model.ts"
import { PermissionModel } from "Drizzle/Entities/Permission"
import { RoleModel } from "Drizzle/Entities/Role"

export default relations(model, ({ one }) => ({
    roles: one(RoleModel, {
        fields: [model.roleId],
        references: [RoleModel.id],
    }),
    permissions: one(PermissionModel, {
        fields: [model.permissionId],
        references: [PermissionModel.id],
    }),
}));

import {relations} from "drizzle-orm";
import { RoleModel } from "Drizzle/Entities/Role"
import {RolePermissionModel} from "Drizzle/ManyToManyRelations/RolePermission";

export default relations(RoleModel, ({ many }) => ({
    permissions: many(RolePermissionModel),
}));

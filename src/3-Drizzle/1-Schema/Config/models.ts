import { RoleModel } from "Drizzle/Entities/Role";
import { PermissionModel } from "Drizzle/Entities/Permission";
import { UserModel } from "Drizzle/Entities/User";


export const drizzleModels = {
    role: RoleModel,
    permission: PermissionModel,
    user: UserModel
}

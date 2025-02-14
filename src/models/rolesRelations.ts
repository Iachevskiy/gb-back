import { relations } from 'drizzle-orm';
import roles from './roles.ts'
import { permissionsToRoles } from "./permissionsToRoles.ts";

export default relations(roles, ({ many }) => ({
    permissionsToRoles: many(permissionsToRoles),
}));





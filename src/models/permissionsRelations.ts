import {relations} from "drizzle-orm";
import { permissionsToRoles } from "./permissionsToRoles.ts";
import permissions from './permissions.ts'

export default relations(permissions, ({ many }) => ({
    permissionsToRoles: many(permissionsToRoles),
}));

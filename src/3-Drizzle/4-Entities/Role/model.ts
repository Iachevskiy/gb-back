import { pgTable, uuid, varchar, boolean, primaryKey } from "drizzle-orm/pg-core";
import { relations } from 'drizzle-orm';

export default pgTable("role", {
    id: uuid("id").defaultRandom().primaryKey(),
    name: varchar("name", { length: 255 }).notNull().unique(),
});

import { pgTable, uuid, varchar, boolean } from "drizzle-orm/pg-core";

export default pgTable("permission", {
    id: uuid("id").defaultRandom().primaryKey(),
    name: varchar("name", { length: 255 }).notNull().unique(),
    enabled: boolean("enabled").default(true),
});

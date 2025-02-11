import { pgTable, serial, text } from "drizzle-orm/pg-core";

export const testModel = pgTable("test", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
});

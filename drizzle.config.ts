import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema:["./src/3-Drizzle/4-Entities/*", "./src/3-Drizzle/3-ManyToManyRelations/*", "./src/3-Drizzle/2-EntityRelation/*"],
  out: "./src/3-Drizzle/1-Schema/Migrations",
  dbCredentials: {
    ssl: false,
    url: process.env.DATABASE_URL || "",
  },
});
